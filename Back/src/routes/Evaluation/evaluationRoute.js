const {Router}= require("express");
const evaluationHandler = require("../../handlers/Evaluation/evaluationHandler");
const evaluationRoutes = Router();

evaluationRoutes.use("/", evaluationHandler);

module.exports = evaluationRoutes;