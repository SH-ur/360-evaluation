const { Employee } = require("../../db");

const employeesList = async () => {
  try {
    const list = await Employee.find().populate("user", "username email employee").populate({path:"evaluations", populate:{path:"feedback", select:"message"}}).exec()
    let response;
    list.length
      ? (response = { answer: list })
      : (response = { answer: "Sorry, the list was empty." });
console.log(response)
    return response;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = employeesList;
