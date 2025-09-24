import express from "express";
import { validateEmail, submitQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/validate", validateEmail);
router.post("/submit", submitQuiz);

export default router;
