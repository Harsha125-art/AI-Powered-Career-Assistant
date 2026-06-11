import express from "express";
import upload from "../middleware/upload.middleware.js";
import protect from "../middleware/auth.middleware.js";
import { uploadResume } from "../controllers/resume.controller.js";
import Resume from "../models/Resume.model.js";


const router = express.Router();

router.post("/upload",protect,upload.single("resume"),uploadResume);

router.get("/my-resumes",protect,async(req,res)=>{
    try{
        
    const resume = await Resume.find({
        user:req.user.id,
    }).sort({createdAt:-1});

 
    res.json(resume);
}catch(err){
    res.status(500).json({
        message:err.message
    })
}
})

router.get("/:id",protect,async(req,res)=>{
    try{
    const resume = await Resume.findOne({
        _id:req.params.id,
        user:req.user.id,
    });

     if(!resume){
    return res.status(404).json({
        message:"Resume not found"
    })
  }


    res.json({
         count: resume.length,
         resume
    });
}catch(err){
    res.status(500).json({
        message:err.message
    })
}
})

router.delete("/:id",protect,async(req,res)=>{
    try{
    const resume = await Resume.findOneAndDelete({
        _id:req.params.id,
        user:req.user.id,
    });

    if(!resume){
    return res.status(404).json({
        message:"Resume not found"
    })
  }

  res.json({
    message:"Resume deleted successfully"
  })
}catch(err){
    res.status(500).json({
        message:err.message
    })
}

    
})

export default router;