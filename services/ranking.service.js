import pool from "../config/db.js";

export const getRanking = async () => {
  const result = await pool.query(
    `
    SELECT

      users.id,

      users.nombre,

      COALESCE(
        SUM(predictions.points),
        0
      ) AS total_points

    FROM users

    LEFT JOIN predictions

      ON users.id = predictions.user_id
    WHERE users.rol_id != 1
    GROUP BY users.id, users.nombre

    ORDER BY total_points DESC
    `,
  );

  return result.rows;
};
