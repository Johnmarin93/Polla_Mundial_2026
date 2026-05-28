import pool from "../config/db.js";

export const getAdminStats = async () => {
  const users = await pool.query("SELECT COUNT(*) FROM users");

  const matches = await pool.query("SELECT COUNT(*) FROM matches");

  const predictions = await pool.query("SELECT COUNT(*) FROM predictions");

  const leader = await pool.query(`

        SELECT nombre,
        total_points

        FROM users

        ORDER BY total_points DESC

        LIMIT 1

      `);

  return {
    users: users.rows[0].count,

    matches: matches.rows[0].count,

    predictions: predictions.rows[0].count,

    leader: leader.rows[0],
  };
};

export const getUsers = async () => {
  const result = await pool.query(`

        SELECT

          id,

          nombre,

          email,

          rol_id,

          total_points,
          is_active

        FROM users

        ORDER BY id ASC
      `);

  return result.rows;
};

export const updateUserRole = async (id, rol_id) => {
  const result = await pool.query(
    `

        UPDATE users

        SET rol_id = $1

        WHERE id = $2

        RETURNING *

      `,

    [rol_id, id],
  );

  return result.rows[0];
};

export const toggleUserStatus = async (id, is_active) => {
  const result = await pool.query(
    `

        UPDATE users

        SET is_active = $1

        WHERE id = $2

        RETURNING *

      `,

    [is_active, id],
  );

  return result.rows[0];
};

export const getTopUsers = async () => {
  const result = await pool.query(`

        SELECT

          nombre,

          total_points

        FROM users

        ORDER BY total_points DESC

        LIMIT 5

      `);

  return result.rows;
};

export const getRecentPredictions = async () => {
  const result = await pool.query(`

        SELECT

          users.nombre,

          matches.home_team,

          matches.away_team,

          predictions.predicted_home_score,

          predictions.predicted_away_score

        FROM predictions

        INNER JOIN users

          ON predictions.user_id = users.id

        INNER JOIN matches

          ON predictions.match_id = matches.id

        ORDER BY predictions.id DESC

        LIMIT 5

      `);

  return result.rows;
};

export const getRecentResults = async () => {
  const result = await pool.query(`

        SELECT

          home_team,

          away_team,

          home_score,

          away_score,

          match_date

        FROM matches

        WHERE status = 'finished'

        ORDER BY match_date DESC

        LIMIT 5

      `);

  return result.rows;
};
