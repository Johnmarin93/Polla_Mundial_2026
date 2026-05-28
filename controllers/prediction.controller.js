import pool from "../config/db.js";

export const createPrediction = async (req, res) => {
  try {
    const { user_id, match_id, predicted_home_score, predicted_away_score } =
      req.body;

    const result = await pool.query(
      `
      INSERT INTO predictions (

        user_id,

        match_id,

        predicted_home_score,

        predicted_away_score

        )

        VALUES ($1, $2, $3, $4)

        ON CONFLICT (user_id, match_id)

        DO UPDATE SET

        predicted_home_score =
            EXCLUDED.predicted_home_score,

        predicted_away_score =
            EXCLUDED.predicted_away_score
        RETURNING *
      `,
      [user_id, match_id, predicted_home_score, predicted_away_score],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error creando pronostico",
    });
  }
};

export const getUserPredictions = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT *

      FROM predictions

      WHERE user_id = $1
      `,
      [userId],
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error obteniendo pronósticos",
    });
  }
};
