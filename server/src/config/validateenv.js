const requiredEnvVars = [
  "MONGO_URI",
  "JWT_SECRET",
  "GROQ_API_KEY"
];

const validateEnv = () => {

  requiredEnvVars.forEach((envVar) => {

    if (!process.env[envVar]) {

      throw new Error(
        `${envVar} is missing in .env`
      );

    }

  });

};

export default validateEnv;