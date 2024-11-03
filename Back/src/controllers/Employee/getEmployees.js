const {Employee}= require("../../db");

const employeesList = async()=>{
    try {
        const list = await Employee.find();
let response;
        list.length? response = {answer: list}: response = {answer: "Sorry, the list was empty."};

        return response;
    } catch (error) {
        return {error: error.message}
    }
}

module.exports= employeesList;