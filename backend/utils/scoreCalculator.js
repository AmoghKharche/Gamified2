// Example correct answers
const correctAnswers = {
    1: "C",
    2: "B",
    3: "C",
    4: "C",
    5: "B"
  };
  
  export const calculateScore = (submittedAnswers) => {
    let correctCount = 0;
    let wrongCount = 0;
  
    Object.entries(submittedAnswers).forEach(([questionId, answer]) => {
      const qid = Number(questionId); // keys are strings
      if (correctAnswers[qid]) {
        if (correctAnswers[qid] === answer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });
  
    const result = correctCount === 5 ? "Pass" : "Fail";
  
    return { correctCount, wrongCount, result };
  };
  