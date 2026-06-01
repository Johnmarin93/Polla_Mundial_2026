import pool from "../config/db.js";

export const updateMatchResult = async (matchId, homeScore, awayScore) => {
  const result = await pool.query(
    `
    UPDATE matches

    SET

      home_score = $1,

      away_score = $2,

      status = 'finished'

    WHERE id = $3

    RETURNING *
    `,

    [homeScore, awayScore, matchId],
  );

  return result.rows[0];
};

export const getMatchesService = async () => {
  const result = await pool.query(`

        SELECT *

        FROM matches

        ORDER BY match_date ASC

      `);

  return result.rows;
};

export const getUpcomingMatches = async () => {
  const res = await pool.query(`
    SELECT
      id,
      home_team,
      away_team,
      home_team_code,
      away_team_code,
      group_name,
      status,
      home_score,
      away_score,
      stadium,
      TO_CHAR(match_date, 'YYYY-MM-DD HH24:MI:SS') AS match_date

    FROM matches

    WHERE status = 'scheduled'

    ORDER BY match_date ASC

    LIMIT 4
  `);

  return res.rows;
};
