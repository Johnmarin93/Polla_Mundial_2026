import pool from "../config/db.js";

export const crearUsuario = async (user) => {
  const { nombre, email, password, rol_id } = user;

  const res = await pool.query(
    "INSERT INTO users (nombre, email, password, rol_id) VALUES ($1, $2, $3, $4) RETURNING nombre, email, rol_id",
    [nombre, email, password, rol_id],
  );
  return res.rows[0];
};

export const obtenerUsuarioPorEmail = async (email) => {
  const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};
