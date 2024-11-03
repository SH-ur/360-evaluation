const {Router} = require("express");
const userHandler = require("../../handlers/User/userHandler")
const userRouter = Router();

userRouter.use("/auth", userHandler);

module.exports= userRouter;