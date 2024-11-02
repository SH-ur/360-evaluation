const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
    message: {type: String, required: [true, "You need to leave a feedback, please..."]},
    employee: {
        type: mongoose.Schema.ObjectId, ref:"Employee"
    }
});

const feedModel = mongoose.model("Feedback", feedBackSchema);

module.exports = feedModel;