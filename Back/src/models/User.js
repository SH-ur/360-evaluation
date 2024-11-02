const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [6, "The minimun length should be at least 6 characters long, and we got {VALUE}"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must be 8 characters long at least please."]
    },
    email: {
        type: String,
        required: [true, "An email is needed for this BD."],
        validate:{
        validator: function(v){
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(v);
        },
        message: props=> `${props.value} is not valid for an email.`
    }
    }
})

const userModel = mongoose.model("User", userSchema);
module.exports= userModel;