import {
  createCategorie,
  getAllCategories,
} from "../models/CategoriesModel.js";

export const addCategorie = async (req, res) => {
  const { nom, description } = req.body;
  try {
    await createCategorie(nom, description);
    res.status(201).json({ message: "Catégorie ajoutée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listerCategories = async (req, res) => {
  try {
    const [rows] = await getAllCategories();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
