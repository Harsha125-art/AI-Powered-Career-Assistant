import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.routes.js';
import resumeRouter from './routes/resume.routes.js'
import jobMatchRoutes from './routes/jobMatch.routes.js'
import jobRecommendations from './routes/job.routes.js'
import SavedJobs from './routes/saveJob.routes.js'
import interviewQuestions from './routes/interview.routes.js'
import errorHandler from './middleware/error.middleware.js';





dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());








app.use('/api/auth', authRoutes);

app.use('/api/resume',resumeRouter);

app.use('/api/job',jobMatchRoutes);

app.use('/api/job',jobRecommendations);

app.use('/api/jobs',SavedJobs);

app.use('/api/interview' , interviewQuestions);

app.use(errorHandler);


export default app;
