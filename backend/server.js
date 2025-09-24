import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from './config/db.js'
import quizRoutes from "./routes/quizRoutes.js";
import morgan from 'morgan';

dotenv.config();
const app = express();

// Add this before routes
app.use(morgan('dev')); // or use a custom format

// Middleware
app.use(express.json());
const corsOptions = {
    origin: ['https://hulcontrolsweek.com','http://34.93.173.147:4200', 'http://localhost:4200']
  }; 
app.use(cors(corsOptions));
// ✅ Default route to check backend health

connectDb();
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// Routes
app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
