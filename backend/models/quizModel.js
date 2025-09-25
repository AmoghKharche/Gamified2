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
    completionTime: { type: Number, default: 0 },
     // IST string timestamps
     createdAtIST: { type: String },
     updatedAtIST: { type: String }
  },
  { timestamps: true }
);

// Pre-save hook to set IST timestamps
quizSchema.pre("save", function(next) {
  const now = new Date();
  this.createdAtIST = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  this.updatedAtIST = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  next();
});

// Pre-update hook to update updatedAtIST
quizSchema.pre("findOneAndUpdate", function(next) {
  const now = new Date();
  this._update.updatedAtIST = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  next();
});

// Optional: convert to JSON with IST timestamps included
quizSchema.set("toJSON", {
  transform: function(doc, ret) {
    ret.createdAtIST = ret.createdAtIST || new Date(ret.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    ret.updatedAtIST = ret.updatedAtIST || new Date(ret.updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    return ret;
  }
});

const Quiz = mongoose.model("Quiz2", quizSchema);
export default Quiz;
