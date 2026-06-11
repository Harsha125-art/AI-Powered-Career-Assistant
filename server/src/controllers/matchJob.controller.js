import Resume from "../models/Resume.model.js";
import { matchResumeWithJob } from "../services/ai.service.js";
import JobMatchModel from "../models/JobMatch.model.js";
import asyncHandler from "../utils/asyncHandler.js";


export const matchJob =asyncHandler(
 async(req,res)=>{
    
    const {resumeId} = req.params;
    const {jobDescription} = req.body;

   

    const resume = await Resume.findOne({
       
        _id:resumeId,
        user : req.user.id,

    });
    if(!resume){
       return res.status(400).json({
            message:"Resume not found"
        });
    }

    const resumeText = resume.extractedText;
    const analysis = await matchResumeWithJob(resumeText,jobDescription);

    const saveJobMatch = await JobMatchModel.create({
    user:req.user.id,
    resume:resumeId,
    jobDescription,
    matchScore:analysis.matchScore,
    matchedSkills:analysis.matchedSkills,
    missingSkills:analysis.missingSkills,
    suggestions:analysis.suggestions
    });

    res.status(200).json({
    message:"Job matched successfully",
    saveJobMatch
});
   


    

});