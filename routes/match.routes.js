import express from "express";

import {
  getMatches,
  updateResult,
  getStandings,
  upcomingMatches,
} from "../controllers/match.controller.js";
import { adminOnly, verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getMatches);
router.get("/standings", getStandings);
router.put(
  "/:id/result",

  verificarToken,

  adminOnly,

  updateResult,
);
router.get("/upcoming", upcomingMatches);

export default router;
