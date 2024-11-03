const {User, Employee} = require("../../db");
const bcrypt= require("bcrypt");
const registerController= async(newUser, newEmployee)=>{
    try {
        if(!newUser || !newEmployee) return {answer: "We cannot proceed if theres no information."};

        const {username, password, email} = newUser;
        const {name, lastName, role, position} = newEmployee;

        if(!username || !password||!email|| !name || !lastName|| !role|| !position) return{answer:"There's a missing field to create the user."}
        else if(role != "Employee" || role != "Admin"|| role != "Manager") return {answer: "The received rol is not in the DB. Only accepts Employee, Manager, or Admin."};

        //Validando existencia
        const verifyUser = await User.find({username, email}).exec();
        const verifyEmployee = await Employee.find(newEmployee).exec();

        if(verifyUser) return {answer: "That user already exists with those credentials."};
        else if(verifyEmployee) return {answer:"Those credentials matched with the information of an Employee."};

        const hashed=await bcrypt.hash(password, 10);
        const employee = await Employee.create(newEmployee);
        await employee.save();
if(!employee) return {answer:"Something went wrong linking employee data."}
        const user= await User.create({...newUser, password: hashed, employee: employee._id})
        await user.save();

        return {answer: "Successfully created!", user: user.populate("employee")};
    } catch (error) {
        return {error: error.message};
    }
}

module.exports = registerController;