import { extractResumeText } from "../services/resume.service.js";
import { analyseResume} from "../services/ai.service.js";
import Resume from "../models/Resume.model.js";
import asyncHandler from "../utils/asyncHandler.js";


export const uploadResume = asyncHandler(
async(req,res)=>{
  
    if(!req.file){
        return res.status(400).json({
            message:"No file upploaded"
        });

    }

    const extractedText =  await extractResumeText(req.file.path);
    const analysis = await analyseResume(extractedText);

    const savedResume = await Resume.create({
  user: req.user.id,
  originalFileName: req.file.originalname,
  extractedText,
  analysis,
});

      res.status(201).json({
      message: "Resume uploaded and parsed successfully",
     resume: savedResume,
    });

});