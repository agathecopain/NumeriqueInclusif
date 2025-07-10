import db from "../config/db.js";

export const createCategorie= (nom, description) => {
    return db.query("INSERT INTO categories (nom, description) VALUES (?, ?)", [nom, description]);
};

export const getAllCategories = () => {
    return db.query("SELECT * FROM categories");

}

export const getCategorieById = (id) => {
    return db.query("SELECT * FROM categories WHERE id = ?", [id]);
};