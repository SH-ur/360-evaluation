const {JWT_SECRET} = process.env;
const {User} = require("../../db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginController = async(userData)=>{
    try {
        const {username, password}= userData;

        if(!username || ! password) return {answer: "I'm so sorry, there's data missing."}
        else if(typeof username == "number") return {answer:"Sorry, the user name cannot be just a number."}

        const verifyExistance = await User.findOne({username}).exec();

        if(!verifyExistance) return {answer: "There's not user with those credentials. Have a nice day!"}
        const isMatch = await bcrypt.compare(password, verifyExistance.password);

        if (isMatch){
            const token = jwt.sign({id: verifyExistance._id}, JWT_SECRET)
            return {answer: `The user ${username} has been verified successfully.`, token}
        }else return {answer: "Sorry, the password did not match with the BD. Check your credentials again please."}

    } catch (error) {
        console.log(error)
        return {error: error.message}
    }
}

module.exports=loginController;