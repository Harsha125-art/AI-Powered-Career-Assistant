import { generateInterviewQuestions } from "../services/ai.service.js";
import Resume from '../models/Resume.model.js'
import asyncHandler from "../utils/asyncHandler.js";



const interviewQuestionsHandler = asyncHandler(
async(req,res)=>{
    
        const {resumeId} = req.params;
        const resume = await Resume.findOne({
            _id:resumeId,
            user:req.user.id
        });
        if(!resume){
            return res.status(400).json({
                message: "Resume not found"
            })
        }
        
       
        const questions = await generateInterviewQuestions(resume.analysis);

        res.status(200).json({
            message:"Interview questions fetched successfully",
            questions,
        })



    }
);

export default interviewQuestionsHandler