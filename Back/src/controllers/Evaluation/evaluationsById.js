const { Evaluation } = require("../../db");

const getById = async (id) => {
  try {
    if (!id) return { answer: "We need the id to continue." };

    const theEvaluation = await Evaluation.findById(id)
      .populate({ path: "fromEmployee", select: "name lastName role position" })
      .populate({ path: "toEmployee", select: "name lastName role position" })
      .populate({ path: "feedback", select: "message" })
      .exec();

    if (theEvaluation == null)
      return { answer: "There are zero results with that id." };

    return { answer: "Here's the answer", results: theEvaluation };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getById;
