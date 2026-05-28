import express from "express";

import { createPrediction } from "../controllers/prediction.controller.js";
import { getUserPredictions } from "../controllers/prediction.controller.js";

const router = express.Router();

router.post("/", createPrediction);
router.get("/user/:userId", getUserPredictions);

export default router;
