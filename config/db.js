import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { error, log } from "console";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

try {
  const connection = await pool.getConnection();
  console.log("Connecté à la base de données !");
  connection.release();
} catch (err) {
  console.error("Erreur de connexion :", err.message);
}

export default pool;
