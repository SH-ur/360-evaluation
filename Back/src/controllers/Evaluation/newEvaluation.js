const { Evaluation, Feedback, Employee } = require("../../db");

const createEvaluation = async (evaluationInfo, targetEmployeeEmail) => {
  try {
    if (!evaluationInfo || !targetEmployeeEmail)
      return { answer: "Sorry, theres no information." };
    else if (typeof targetEmployeeEmail == "number")
      return { answer: "The email cannot be a number." };
    const { answer1, answer2, answer3, answer4, answer5, feedback } =
      evaluationInfo;
    if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5 || !feedback)
      return { answer: "There's missing information" };

    const verifyEmail = await Employee.find({ email: targetEmployeeEmail });

    if (!verifyEmail)
      return {
        answer:
          "I'm sorry, that email is not in the DB or registered to any User",
      };

    const newFeedback = Feedback.create({ feedback: feedback });
    if (!newFeedback) return { answer: "Problems saving feedback." };
    await newFeedback.save();
    const newEvaluation = Evaluation.create({
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      employee: verifyEmail._id,
      feedback: newFeedback._id,
    });

    if (!newEvaluation)
      return { answer: "Problems saving Evaluation, try again later." };
    await newEvaluation.save();

    return {
      answer: "Evaluation succesfully created and saved",
      info: newEvaluation,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = createEvaluation;
