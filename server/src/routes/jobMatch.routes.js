import express from "express";
import protect from '../middleware/auth.middleware.js'
import { matchJob } from "../controllers/matchJob.controller.js";

const router = express.Router();

router.post("/match/:resumeId",protect,matchJob);

export default router;
