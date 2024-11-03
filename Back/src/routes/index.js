const Router = require("express");
const routes= require("./routes")
const router = Router();

router.use("/api", routes)

module.exports= router;