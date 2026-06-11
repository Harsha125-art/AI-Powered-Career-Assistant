import express from "express";
import protect from "../middleware/auth.middleware.js"

import { getSavedJobs,saveJob,deleteSavedJob } from "../controllers/saveJob.controller.js";

const router = express.Router();


router.post("/", protect, saveJob);

router.get("/", protect, getSavedJobs);

router.delete("/:id", protect, deleteSavedJob);

export default router;