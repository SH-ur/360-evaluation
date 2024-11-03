const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
    message: {type: String, required: [true, "You need to leave a feedback, please..."]},
});

const feedModel = mongoose.model("Feedback", feedBackSchema);

module.exports = feedModel;