import pool from "../config/db.js";
import {
  updateMatchResult,
  getMatchesService,
  getUpcomingMatches,
} from "../services/match.service.js";
import { calculatePoints } from "../utils/calculatePoints.js";
import {
  getPredictionsByMatch,
  updatePredictionPoints,
} from "../services/prediction.service.js";
import { updateUserTotalPoints } from "../services/user.service.js";

export const getMatches = async (req, res) => {
  try {
    const result = await pool.query(`
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
      ORDER BY match_date ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error obteniendo partidos",
    });
  }
};

export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;

    const { home_score, away_score } = req.body;

    const match = await updateMatchResult(
      id,

      home_score,

      away_score,
    );

    const predictions = await getPredictionsByMatch(id);

    for (const prediction of predictions) {
      const points = calculatePoints(prediction, match);

      await updatePredictionPoints(prediction.id, points);

      await updateUserTotalPoints(prediction.user_id);
    }
    res.json(match);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error actualizando resultado",
    });
  }
};

export const getStandings = async (req, res) => {
  try {
    const matches = await getMatchesService();

    const finishedMatches = matches.filter(
      (match) =>
        match.status === "finished" &&
        match.home_score !== null &&
        match.away_score !== null,
    );

    const standings = {};

    finishedMatches.forEach((match) => {
      const home = match.home_team;

      const away = match.away_team;

      const group = match.group_name;

      if (!standings[group]) {
        standings[group] = {};
      }

      if (!standings[group][home]) {
        standings[group][home] = {
          team: home,

          group,

          pts: 0,

          pj: 0,

          pg: 0,

          pe: 0,

          pp: 0,

          gf: 0,

          gc: 0,

          dg: 0,
        };
      }

      if (!standings[group][away]) {
        standings[group][away] = {
          team: away,

          group,

          pts: 0,

          pj: 0,

          pg: 0,

          pe: 0,

          pp: 0,

          gf: 0,

          gc: 0,

          dg: 0,
        };
      }

      const homeTeam = standings[group][home];

      const awayTeam = standings[group][away];

      homeTeam.pj += 1;
      awayTeam.pj += 1;

      homeTeam.gf += match.home_score;

      homeTeam.gc += match.away_score;

      awayTeam.gf += match.away_score;

      awayTeam.gc += match.home_score;

      if (match.home_score > match.away_score) {
        homeTeam.pg += 1;

        homeTeam.pts += 3;

        awayTeam.pp += 1;
      } else if (match.home_score < match.away_score) {
        awayTeam.pg += 1;

        awayTeam.pts += 3;

        homeTeam.pp += 1;
      } else {
        homeTeam.pe += 1;

        awayTeam.pe += 1;

        homeTeam.pts += 1;

        awayTeam.pts += 1;
      }

      homeTeam.dg = homeTeam.gf - homeTeam.gc;

      awayTeam.dg = awayTeam.gf - awayTeam.gc;
    });

    Object.keys(standings).forEach((group) => {
      standings[group] = Object.values(standings[group]).sort(
        (a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf,
      );
    });

    res.json(standings);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const upcomingMatches = async (req, res) => {
  try {
    const matches = await getUpcomingMatches();

    res.json(matches);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Error obteniendo próximos partidos",
    });
  }
};
