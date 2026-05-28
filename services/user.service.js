import pool from "../config/db.js";

export const crearUsuario = async (user) => {
  const {
    nombre,

    email,

    password,

    rol_id,
  } = user;

  const res = await pool.query(
    `
        INSERT INTO users
        (
          nombre,
          email,
          password,
          rol_id
        )

        VALUES
        ($1, $2, $3, $4)

        RETURNING
        nombre,
        email,
        rol_id
        `,

    [nombre, email, password, rol_id],
  );

  return res.rows[0];
};

export const obtenerUsuarioPorEmail = async (email) => {
  const res = await pool.query(
    `
        SELECT *

        FROM users

        WHERE email = $1
        `,

    [email],
  );

  return res.rows[0];
};

export const getUserStatsService = async (userId) => {
  const pointsResult = await pool.query(
    `
    SELECT
      COALESCE(
        SUM(points),
        0
      ) AS total_points

    FROM predictions

    WHERE user_id = $1
    `,

    [userId],
  );

  const rankingResult = await pool.query(
    `
        SELECT id

        FROM users

        ORDER BY total_points DESC
        `,
  );

  const ranking = rankingResult.rows;

  const position = ranking.findIndex((u) => u.id === userId) + 1;

  const predictionsResult = await pool.query(
    `
        SELECT COUNT(*)

        FROM predictions

        WHERE user_id = $1
        `,

    [userId],
  );

  return {
    points: Number(pointsResult.rows[0].total_points),

    position,

    predictions: Number(predictionsResult.rows[0].count),
  };
};

export const updateUserTotalPoints = async (userId) => {
  await pool.query(
    `
      UPDATE users

      SET total_points = (

        SELECT COALESCE(
          SUM(points),
          0
        )

        FROM predictions

        WHERE user_id = $1

      )

      WHERE id = $1
      `,

    [userId],
  );
};

export const resetUserPassword = async (userId, hashedPassword) => {
  const res = await pool.query(
    `
        UPDATE users

        SET password = $1

        WHERE id = $2

        RETURNING id, nombre, email
        `,

    [hashedPassword, userId],
  );

  return res.rows[0];
};

export const updatePassword = async (userId, hashedPassword) => {
  await pool.query(
    `
      UPDATE users

      SET password = $1

      WHERE id = $2
      `,

    [hashedPassword, userId],
  );
};
