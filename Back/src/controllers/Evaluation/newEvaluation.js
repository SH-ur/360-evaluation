const { Evaluation, Feedback, User, Employee } = require("../../db");

const createEvaluation = async (
  evaluationInfo,
  targetEmployeeEmail,
  fromMail
) => {
  try {
    if (!evaluationInfo || !targetEmployeeEmail)
      return { answer: "Sorry, theres no information." };
    else if (typeof targetEmployeeEmail == "number")
      return { answer: "The email cannot be a number." };
    const { answer1, answer2, answer3, answer4, answer5, feedback } =
      evaluationInfo;
    if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5 || !feedback)
      return { answer: "There's missing information" };

    const verifyTo = await User.findOne({ email: targetEmployeeEmail })
      .populate({ path: "employee", select: "name" })
      .exec();
    const verifyFrom = await User.findOne({ email: fromMail })
      .populate({ path: "employee", select: "name" })
      .exec();

    if (!verifyTo || !verifyFrom)
      return {
        answer: "I'm sorry, the from or to emails are not in our DB.",
      };
    const verifyDoubleEvaluation = await Evaluation.findOne({
      toEmployee: verifyTo.employee,
      fromEmployee: verifyFrom.employee,
    })
      .populate({ path: "fromEmployee", select: "name" })
      .populate({ path: "toEmployee", select: "name" })
      .exec();
    if (verifyDoubleEvaluation)
      return {
        answer: `There was already a Evaluation from the Employee ${verifyFrom?.name} to the Employee ${verifyTo?.name}`,
      };

    const newFeedback = await Feedback.create({ message: feedback });
    if (!newFeedback) return { answer: "Problems saving feedback." };

    const newEvaluation = await Evaluation.create({
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      toEmployee: verifyTo.employee,
      fromEmployee: verifyFrom.employee,
      feedback: newFeedback._id,
    });
    await Employee.findByIdAndUpdate(
      verifyTo.employee,
      { $push: { evaluations: newEvaluation._id } },
      { new: true }
    );
    if (!newEvaluation)
      return { answer: "Problems saving Evaluation, try again later." };
    await newFeedback.save();
    await newEvaluation.save();
    const completeEvaluation = await Evaluation.findById(newEvaluation._id)
      .populate({ path: "feedback", select: "message" })
      .populate({ path: "toEmployee", select: "name email" })
      .exec();
    return {
      answer: "Evaluation succesfully created and saved",
      info: completeEvaluation,
    };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = createEvaluation;
