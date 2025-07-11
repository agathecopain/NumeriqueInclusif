import {
  findArticleByTitle,
  createArticle,
  getAllArticles,
  updateArticleInDb,
  deleteArticleFromDb,
  getArticlesByCategory,
} from "../models/ArticlesModel.js";
import { getAllCategories } from "../models/CategoriesModel.js";

export async function showArticleForm(req, res) {
  const [rows] = await getAllCategories();
  res.render("editArticle", { error: null, success: null, categories: rows });
}

export async function edit(req, res) {
  const { title, category_id, description, content } = req.body;
  const image_url = req.file ? req.file.filename : null;
  try {
    await createArticle(title, category_id, description, content, image_url);
    res.status(201).json({ message: "Article ajouté" });
    res.render("editArticle", { error: null, sucess: null, categories: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, category_id, description, content } = req.body;
  const image_url = req.file ? req.file.filename : null;
  try {
    await updateArticleInDb(
      id,
      title,
      category_id,
      description,
      content,
      image_url
    );
    res.json({ message: "Article mis à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteArticleFromDb(id);
    res.json({ message: "Article supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const displayArticlesByCategorie = async (req, res) => {
  const { id } = req.params;
  const [rows] = await getArticlesByCategory(id);
  console.log(rows);
  res.render("category", { error: null, success: null, articles: rows });
};
