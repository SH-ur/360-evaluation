const {Router}= require("express");
const userRoutes = require("./User/userRoutes");
const employeeRouter = require("./Employee/employeeRoutes");
const evaluationRoutes = require("./Evaluation/evaluationRoute");

const routes = Router();

routes.use("/", userRoutes)
routes.use("/employees", employeeRouter)
routes.use("/evaluations", evaluationRoutes)


module.exports = routes;