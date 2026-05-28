import express from "express";

import { getMatches, updateResult } from "../controllers/match.controller.js";

import { adminOnly, verificarToken } from "../middlewares/auth.middleware.js";

import {
  getStats,
  getAllUsers,
  changeUserRole,
  updateUserStatus,
  topUsers,
  recentPredictions,
  recentResults,
} from "../controllers/admin.controller.js";
import { adminResetPassword } from "../controllers/user.controller.js";

const router = express.Router();

router.get(
  "/stats",

  verificarToken,

  adminOnly,

  getStats,
);

router.get(
  "/users",

  verificarToken,

  adminOnly,

  getAllUsers,
);

router.put(
  "/users/:id/role",

  verificarToken,

  adminOnly,

  changeUserRole,
);
router.put(
  "/users/:id/status",

  verificarToken,

  adminOnly,

  updateUserStatus,
);

router.get(
  "/top-users",

  verificarToken,

  adminOnly,

  topUsers,
);

router.get(
  "/recent-predictions",

  verificarToken,

  adminOnly,

  recentPredictions,
);

router.get(
  "/recent-results",

  verificarToken,

  adminOnly,

  recentResults,
);

router.put(
  "/users/:id/reset-password",

  verificarToken,

  adminOnly,

  adminResetPassword,
);

export default router;
