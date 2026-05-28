import pool from "../config/db.js";

import { matches } from "../data/matches.js";

const syncMatches = async () => {
  try {
    console.log("⚽ Sincronizando partidos...");

    for (const match of matches) {
      await pool.query(
        `
        INSERT INTO matches (
          api_match_id,
          home_team,
          home_team_code,
          away_team,
          away_team_code,
          match_date,
          group_name,
          round,
          status,
          stadium
        )

        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        `,
        [
          match.id,

          match.home_team,

          match.home_team_code,

          match.away_team,

          match.away_team_code,

          match.match_date,

          match.group_name,

          match.round,

          match.status,

          match.stadium,
        ],
      );

      console.log(`✅ ${match.home_team} vs ${match.away_team}`);
    }

    console.log("🔥 Partidos sincronizados correctamente");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

syncMatches();
