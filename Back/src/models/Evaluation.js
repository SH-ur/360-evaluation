const mongoose =  require("mongoose");

const evaluationSchema = new mongoose.Schema({
    name: {type: String, required: true, default:"Evaluación 360 Mensual"},
    questions: [String],
    answer1: {type: Number, required: true, max: [10, "You can't rate more than 10 stars"], min: [1, "You can't rate with 0."]},
    answer2: {type: Number, required: true, max: [10, "You can't rate more than 10 stars"], min: [1, "You can't rate with 0."]},
    answer3: {type: Number, required: true, max: [10, "You can't rate more than 10 stars"], min: [1, "You can't rate with 0."]},
    answer4: {type: Number, required: true, max: [10, "You can't rate more than 10 stars"], min: [1, "You can't rate with 0."]},
    answer5: {type: Number, required: true, max: [10, "You can't rate more than 10 stars"], min: [1, "You can't rate with 0."]},
    fromEmployee: {type: mongoose.Schema.Types.ObjectId, ref: "Employee"},
    toEmployee: {type: mongoose.Schema.Types.ObjectId, ref:"Employee"},
    feedback: {type: mongoose.Schema.Types.ObjectId, ref:"Feedback"}
})

const evaluationModel = mongoose.model("Evaluation", evaluationSchema)
module.exports= evaluationModel;