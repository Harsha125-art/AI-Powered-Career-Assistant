import express from "express";
import interviewQuestionsHandler from "../controllers/interview.controller.js";
import protect from '../middleware/auth.middleware.js'


const router = express.Router();

router.post('/:resumeId',protect,interviewQuestionsHandler);

export default router;


