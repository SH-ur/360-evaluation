const {Router}= require("express");
const employeesList = require("../../controllers/Employee/getEmployees");
const employeeRouter = Router();

employeeRouter.get("/", async(req, res)=>{
    try {
        const response = await employeesList();

        typeof response== "string"? res.status(400).json(response): res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports= employeeRouter;