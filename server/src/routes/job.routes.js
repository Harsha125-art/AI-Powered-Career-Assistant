import express from "express";
import { Router } from "express";
import protect from "../middleware/auth.middleware.js";
import { recommendJobs } from "../controllers/job.controller.js";



const router = express.Router();

router.get('/recommend/:resumeId',protect, recommendJobs);

export default router;