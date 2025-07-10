import pool from "../config/db.js";

export async function createArticle(
  title,
  category_id,
  description,
  content,
  image_url
) {
  await pool.query(
    "INSERT INTO articles (title, category_id, description, content, image_url) VALUES (?,?,?,?,?)",
    [title, category_id, description, content, image_url]
  );
}

export const getAllArticles = async () => {
  const [rows] = await pool.query(
    `SELECT articles.*, categories.name, users.pseudo
    FROM articles
    LEFT JOIN users ON articles.user_id = users.id
    LEFT JOIN categories ON articles.category_id = categories.id`
  );
  return rows
};

export const getArticlesByCategory = (category_name) => {
  const [rows] = pool.query(
    `SELECT articles.title
    FROM articles
    JOIN categories ON articles.category_id = categories.id
    WHERE categories.name= ?`,
    [category_name]
  );
  return rows;
};

export async function findArticleByTitle(title) {
  const [rows] = await pool.query("SELECT * FROM articles WHERE title = ?", [
    title,
  ]);
  return rows[0];
}

export const updateArtcileInDb = (
  id,
  title,
  category_id,
  description,
  content,
  image_url
) => {
  return pool.query(
    "UPDATE articles SET title =?, category_id =?, description=?, image_url=?, content = ? WHERE id=?",
    [title, category_id, description, content, image_url, id]
  );
};

export const deleteArticleFromDb = (id) => {
  return pool.query("DELETE FROM articles WHERE id = ?", [id]);
};
