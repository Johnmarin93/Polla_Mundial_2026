import pool from "../config/db.js";

export const getPredictionsByMatch = async (matchId) => {
  const result = await pool.query(
    `
      SELECT *

      FROM predictions

      WHERE match_id = $1
      `,

    [matchId],
  );

  return result.rows;
};

export const updatePredictionPoints = async (predictionId, points) => {
  await pool.query(
    `
      UPDATE predictions

      SET points = $1

      WHERE id = $2
      `,

    [points, predictionId],
  );
};
