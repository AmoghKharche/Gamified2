import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: { type: Number, required: true },
  answer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    answers: [answerSchema],
    correctCount: { type: Number, default: 0 },
    wrongCount: { type: Number, default: 0 },
    result: { type: String, enum: ["Pass", "Fail"], default: "Fail" },
    completionTime: { type: Number, default: 0 }
  },
  { timestamps: true }
);

quizSchema.set("toJSON", {
  transform: function (doc, ret) {
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 mins in ms
    if (ret.createdAt) {
      ret.createdAt = new Date(
        new Date(ret.createdAt).getTime() + istOffset
      ).toISOString();
    }
    if (ret.updatedAt) {
      ret.updatedAt = new Date(
        new Date(ret.updatedAt).getTime() + istOffset
      ).toISOString();
    }
    return ret;
  }
});

const Quiz = mongoose.model("Quiz2", quizSchema);
export default Quiz;
