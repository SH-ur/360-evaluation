const {Router}= require("express");
const employeeHandler = require("../../handlers/Employee/employeeHandler");
const employeeRouter = Router();

employeeRouter.use("/", employeeHandler);

module.exports = employeeRouter;