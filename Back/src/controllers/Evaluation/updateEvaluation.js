const { Evaluation } = require("../../db");

const updEvaluation = async (evaluationId, infoToUpd, role) => {
  try {
    if (role != "Admin")
      return { answer: "I'm sorry, but only Admins can access this resource." };
    if (!evaluationId)
      return { answer: "We're so sorry, but we need the id to continue" };
    else if (!infoToUpd)
      return {
        answer: "We need the info to make the update possible please :)",
      };
    const { questions, many } = infoToUpd;
    if (questions.length != 5)
      return { answer: "There are missing questions in the array" };

    const updating = await Evaluation.findOneAndUpdate(
      { _id: evaluationId },
      { questions },
      { new: true }
    )
      .populate({ path: "fromEmployee", select: "name lastName role position" })
      .populate({ path: "toEmployee", select: "name lastName role position" })
      .exec();

    if (!updating)
      return {
        answer:
          "Something went wrong updating the evaluation...Maybe there isnt a evaluation with that id in the DB.",
      };
    //Extra stuff: Here is some logic to update the new questions in all evaluations :)
    if (many == true) await Evaluation.updateMany({}, { questions: questions });
    return { answer: "Evaluation updated successfully!", results: updating };
  } catch (error) {
    return { error: error?.message };
  }
};

module.exports = updEvaluation;
