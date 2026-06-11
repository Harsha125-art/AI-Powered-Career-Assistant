import SavedJobsModel from "../models/SavedJobs.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const saveJob = asyncHandler(
async (req, res) => {
  

    const job = await SavedJobsModel.create({
      user: req.user.id,
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      salaryMin: req.body.salaryMin,
      salaryMax: req.body.salaryMax,
      url: req.body.url,
    });


    res.status(201).json(job);

  
}
);

export const getSavedJobs = asyncHandler(
 async(req,res)=>{
    
        const jobs = await SavedJobsModel.find({
            user:req.user.id
        })
       
        res.json({
            message:"Saved jobs fetched successfully",
            jobs
        });
  
})
export const deleteSavedJob = asyncHandler(
async (req, res) => {
  

    await SavedJobsModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    res.json({
      message: "Job removed",
    });

 
});