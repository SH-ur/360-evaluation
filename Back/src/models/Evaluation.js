const mongoose =  require("mongoose");

const evaluationSchema = new mongoose.Schema({
    answer1: {type: mongoose.Decimal128, set: v=>mongoose.Types.Decimal128.fromString(v.toFixed(2)), get: v=> parseFloat(v.toString()).toFixed(2), required: true},
    answer2: {type: mongoose.Decimal128, set: v=>mongoose.Types.Decimal128.fromString(v.toFixed(2)), get: v=> parseFloat(v.toString()).toFixed(2), required: true},
    answer3: {type: mongoose.Decimal128, set: v=>mongoose.Types.Decimal128.fromString(v.toFixed(2)), get: v=> parseFloat(v.toString()).toFixed(2), required: true},
    answer4: {type: mongoose.Decimal128, set: v=>mongoose.Types.Decimal128.fromString(v.toFixed(2)), get: v=> parseFloat(v.toString()).toFixed(2), required: true},
    answer5: {type: mongoose.Decimal128, set: v=>mongoose.Types.Decimal128.fromString(v.toFixed(2)), get: v=> parseFloat(v.toString()).toFixed(2), required: true},
    employee: [{type: mongoose.Schema.Types.ObjectId, ref: "Employee"}],
    feedback: {type: mongoose.Schema.Types.ObjectId, ref:"Feedback"}
})

const evaluationModel = mongoose.model("Evaluation", evaluationSchema)
module.exports= evaluationModel;