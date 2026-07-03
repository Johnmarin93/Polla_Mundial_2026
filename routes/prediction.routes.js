import express from "express";

import { createPrediction } from "../controllers/prediction.controller.js";
import { getUserPredictions } from "../controllers/prediction.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verificarToken, createPrediction);
router.get("/user/:userId", verificarToken, getUserPredictions);

export default router;
