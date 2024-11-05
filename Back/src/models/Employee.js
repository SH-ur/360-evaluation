const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required:true
    },
    position: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:["Employee", "Manager", "Admin"],
        default: "Employee"
    },
    evaluations: [{type: mongoose.Schema.Types.ObjectId, ref:"Evaluation"}],
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;
