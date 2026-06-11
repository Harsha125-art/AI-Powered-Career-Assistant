import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});



export const analyseResume = async (resumeText) => {
  try {
    const prompt = `
You are an expert ATS Resume Evaluator and Career Coach.

Analyze the resume thoroughly and extract important information.

Evaluate the resume based on:

1. Technical Skills (25 points)
2. Experience/Relevance (25 points)
3. Projects Quality (20 points)
4. Resume Structure & Formatting (15 points)
5. Keywords & ATS Optimization (15 points)

For each category:

* Give a score.
* Explain the reasoning briefly.

Scoring Guidelines:

* Students with decent projects and skills should generally score between 60-85.
* Exceptional resumes can score 85-95.
* Only give below 50 if the resume is seriously lacking.

Project Analysis Requirements:

* Identify all major projects.
* Extract project name.
* Extract technologies used.
* Give a short description of each project.
* Highlight strengths of the project.
* Mention missing improvements if applicable.

Return ONLY valid JSON in the following format:

{
"atsScore": 0,
"summary": "",
"skills": [],
"strengths": [],
"missingSkills": [],
"suggestions": [],
"recommendedRoles": [],
"projects": [
{
"name": "",
"description": "",
"technologies": [],
"strengths": [],
"improvements": []
}
]
}

Rules:

* Return only JSON.
* Do not include markdown.
* Do not include explanations outside JSON.
* Ensure projects array is always returned. If no projects exist, return an empty array.

Resume:
${resumeText}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: {
        type: "json_object",
      },
    });

    const response =
      completion.choices[0].message.content;

    return JSON.parse(response);

  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("Failed to analyze resume");
  }
};

export const matchResumeWithJob = async (resumeText,jobDescription) => {
  try {
    const prompt = `
Analyze the following resume and return ONLY valid JSON.

Expected format:

{
  "matchScore":0,
  "matchedSkills":[],
  "missingSkills":[],
  "suggestions":[]
}

Rules:
- matchScore should be between 0 and 100.
- matchedSkills should contain skills found in both resume and job description.
- missingSkills should contain required skills missing from the resume.
- suggestions should help improve the resume for this job.

Resume:
${resumeText}

JobDescription:
${jobDescription}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      response_format: {
        type: "json_object",
      },
    });

    const response =
      completion.choices[0].message.content;

    return JSON.parse(response);

  } catch (error) {
    console.error("AI ResumeMatchWithJob Error:", error);
    throw new Error("Failed to match resume and job description");
  }
};

export const generateInterviewQuestions = async (analysis) => {
  try {
    const prompt = `
   You are an expert technical interviewer.

Candidate Summary:
${analysis.summary}

Skills:
${analysis.skills.join(", ")}

Recommended Roles:
${analysis.recommendedRoles.join(", ")}

Projects:
${analysis.projects
  ?.map(
    (project) => `
Project Name: ${project.name}
Description: ${project.description}
Technologies: ${project.technologies?.join(", ") || "Not specified"}
Strengths: ${project.strengths?.join(", ") || "Not specified"}
Improvements: ${project.improvements?.join(", ") || "Not specified"}
`
  )
  .join("\n")}

For even better int

Generate:

1. 10 technical questions based ONLY on the skills listed.
2. 5 project-based questions from the resume projects.
3. 5 HR questions tailored to the candidate profile.

Do not generate generic questions.

Return ONLY valid JSON:

{
  "technicalQuestions": [],
  "projectQuestions": [],
  "hrQuestions": []
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      response_format: {
        type: "json_object",
      },
    });

    

    const response =
      completion.choices[0].message.content;
     
    return JSON.parse(response);

  } catch (error) {
    console.error("AI ResumeMatchWithJob Error:", error);
    throw new Error("Failed to match resume and job description");
  }
};