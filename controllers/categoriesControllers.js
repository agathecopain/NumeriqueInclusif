import { createCategorie, getAllCategories, getCategorieById } from "../models/CategoriesModel.js";

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

export const showCategorie = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await getCategorieById(id);

        if (rows.length === 0) {
            return res.status(404).send("Catégorie non trouvée");
        }

    const [categories] = await getAllCategories();

    res.render("category.twig", { category: rows[0], categories, user: req.session?.user || null });
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
};
