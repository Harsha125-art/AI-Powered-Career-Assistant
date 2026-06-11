import axios from "axios";

export const getJobRecommendations = async (role) => {
  try {

    const query = role;
    console.log(query);

    const response = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/in/search/1`,
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_APP_KEY,
          what: query,
          results_per_page: 10,
          "content-type": "application/json"
        }
       
      }
    );
    

    const jobs = response.data.results.map((job) => ({
      title: job.title,
      company: job.company?.display_name || "Unknown",
      location: job.location?.display_name || "Remote",
      salaryMin: job.salary_min || null,
      salaryMax: job.salary_max || null,
      description: job.description,
      url: job.redirect_url
    }));

    console.log(jobs);

    return jobs;

  } catch (error) {
    console.error("Adzuna API Error:", error.response?.data || error);

    throw new Error("Failed to fetch jobs");
  }
};