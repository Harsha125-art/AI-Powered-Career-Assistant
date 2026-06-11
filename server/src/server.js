import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

import connectDb from './config/db.js';
import validateEnv from './config/validateenv.js';



const PORT = process.env.PORT || 5000;

console.log("Groq Key:", process.env.GROQ_API_KEY);

validateEnv();
const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Server failed:", error);
  }
};

startServer();

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
