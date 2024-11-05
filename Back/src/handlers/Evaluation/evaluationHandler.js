const { Router } = require("express");
const createEvaluation = require("../../controllers/Evaluation/newEvaluation");
const getById = require("../../controllers/Evaluation/evaluationsById");
const updEvaluation = require("../../controllers/Evaluation/updateEvaluation");
const evaluationHandler = Router();

evaluationHandler
  .post("/", async (req, res) => {
    try {
      if (!req.body)
        res.status(400).json("Sorry, we need information in the body.");

      const response = await createEvaluation(
        req.body.evaluationInfo,
        req.body.targetEmployeeEmail,
        req.body.fromMail
      );

      response.info
        ? res.status(200).json(response)
        : res.status(400).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) res.status(400).json("We need an id please");

      const response = await getById(id);

      response.results
        ? res.status(200).json(response)
        : res.status(400).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { infoToUpdate, role } = req.body;
      
      if (!id) res.status(400).json("Missing Id in the params, sorry");
      else if (!infoToUpdate)
        res.status(400).json("We need the information to proceed...");
      const response = await updEvaluation(id, infoToUpdate, role);

      response.results
        ? res.status(200).json(response)
        : res.status(400).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = evaluationHandler;
