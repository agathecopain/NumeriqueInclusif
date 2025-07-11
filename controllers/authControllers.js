
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/UsersModel.js";
import { sendVerificationEmail } from "../utils/mailer.js";

export const register = async (req, res) => {
  const { email, password, confirmPassword, roles } = req.body;
  const userRole = roles ? roles : "user";

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne correspondent pas." });
  }

  try {
    const existing = await User.findByEmail(email);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email déjà utilisé." });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, roles: userRole });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const link = `http://localhost:3002/api/auth/verify/${token}`;

    sendVerificationEmail(email, link);

    res
      .status(201)
      .json({
        message:
          "Utilisateur créé. Vérifiez vos emails pour activer votre compte.",
      });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const users = await User.findByEmail(email);
    if (users.length === 0) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    await User.verifyUser(email);
    res.json({ message: "Compte vérifié avec succès." });
  } catch (err) {
    res.status(400).json({ message: "Token invalide ou expiré." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await User.findByEmail(email);
    if (users.length === 0)
      return res.status(401).json({ message: "Identifiants invalides." });

    const user = users[0];
    if (!user.is_verified)
      return res
        .status(403)
        .json({ message: "Veuillez vérifier votre email." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    const token = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Connexion réussie.", token });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};