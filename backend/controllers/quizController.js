import Quiz from "../models/quizModel.js";
import { calculateScore } from "../utils/scoreCalculator.js";

// API 1: Validate Email
export const validateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Quiz.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.json({ message: "Email is valid" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API 2: Submit Quiz
export const submitQuiz = async (req, res) => {
  try {
    const { email, answers, completionTime } = req.body;

    // Check if already submitted
    const existing = await Quiz.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already submitted" });
    }

    // Calculate quiz score
    const { correctCount, wrongCount, result } = calculateScore(answers);

    // Convert answers object into array of {question, answer}
    const answerArray = Object.entries(answers).map(([question, answer]) => ({
      question: Number(question),
      answer
    }));

    // Save quiz with completion time
    const quiz = new Quiz({
      email,
      answers: answerArray,
      correctCount,
      wrongCount,
      result,
      completionTime: completionTime || 0 // fallback if not provided
    });

    await quiz.save();

    res.status(201).json({
      message: "Quiz submitted successfully",
      feedbackLink: "https://forms.office.com/e/Pj6Az2xLDK"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
