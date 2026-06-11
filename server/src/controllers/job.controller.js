import Resume from "../models/Resume.model.js";
import { getJobRecommendations } from "../services/job.services.js";
import asyncHandler from "../utils/asyncHandler.js";



export const recommendJobs = asyncHandler(
 async(req,res)=>{
    
        const {resumeId} = req.params;

        const resume = await Resume.findOne({
            _id:resumeId,
            user:req.user.id
        })
        if(!resume){
            return res.status(404).json({
                message:"Resume not found"
            })
        }
        const role = resume.analysis.recommendedRoles[0];
        const jobs = await getJobRecommendations(role);
       

      

        res.status(200).json({
            message:"Jobs fetched successfully",
            jobs
        })



    
} )