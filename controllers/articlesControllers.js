import {
  findArticleByTitle,
  createArticle,
  getAllArticles,
  updateArtcileInDb,
  deleteArticleFromDb,
  getArticlesByCategory,
} from "../models/ArticlesModel.js";

export function showArticleForm(req, res) {
  res.render("editArticle", { error: null, sucess: null });
}

export async function edit(req, res) {
  const { title, category_id, description, content } = req.body;
  const image_url = req.file ? req.file.filename : null;
  try {
    await createArticle(title, category_id, description, content, image_url);
    res.status(201).json({ message: "Article ajouté" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const listArticle = async (req, res) => {
  const [rows] = await getAllArticles();
  res.json(rows);
};

export const updateArtcile = async (req, res) => {
  const { id } = req.params;
  const { title, category_id, description, content } = req.body;
  const image_url = req.file ? req.file.filename : null;
  try {
    await updateArtcileInDb(
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
