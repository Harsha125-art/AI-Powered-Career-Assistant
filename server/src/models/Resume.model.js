import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    analysis: {
      summary: String,
      skills: [String],
      strengths: [String],
      missingSkills: [String],
      atsScore: Number,
      suggestions: [String],
      recommendedRoles: [String],
       projects: [
    {
      name: String,
      description: String,
      technologies: [String],
      strengths: [String],
      improvements: [String],
    },
  ],
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;