import mongoose from "mongoose";

const SavedJobsSchema = new mongoose.Schema({
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,
    company: String,
    location: String,
    salaryMin: Number,
    salaryMax: Number,
    url: String,
},{timestamps:true});

export default mongoose.model("savedJobs",SavedJobsSchema);
