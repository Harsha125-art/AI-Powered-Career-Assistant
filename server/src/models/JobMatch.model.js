import mongoose from "mongoose";

const JobMatchSchema = new mongoose.Schema({
     user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  resume:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Resume"
  },

  jobDescription:String,

  matchScore:Number,

  matchedSkills:[String],

  missingSkills:[String],

  suggestions:[String]

},{timestamps:true});

export default mongoose.model("JobMatch",JobMatchSchema);