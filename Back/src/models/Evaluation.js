const mongoose =  require("mongoose");

const evaluationSchema = new mongoose.Schema({
    answer1: {type: String, required: true},
    answer2: {type: String, required: true},
    answer3: {type: String, required: true},
    answer4: {type: String, required: true},
    answer5: {type: String, required: true},
    employee: {type: mongoose.ObjectId, ref: "Employee"}
})

const evaluationModel = mongoose.model("Evaluation", evaluationSchema)
module.exports= evaluationModel;