import pool from '../config/db.js'

export async function getAllContacts() {
    const [rows] = await pool.query(`SELECT * FROM contact`);
    return rows

}
export async function createContact(contact) {
    const { nom, firstname,  email, messages, avatar_url= null } = contact;
    const [result] = await pool.query(
        `INSERT INTO contact (name, firstname, email, messages, avatar_url) VALUES (?, ?, ?, ?, ?)`,
        [nom, firstname, email, messages, avatar_url]
    );
    return result.insertId;
}

export async function getContactById(id) {
    const [rows] = await pool.query(
        `SELECT * FROM contact WHERE id = ?`,
        [id]
    );
    return rows[0];
}

export async function deleteContact(id) {
    const [result] = await pool.query(
        `DELETE FROM contact WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0;
}