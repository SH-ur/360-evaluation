const {Router}= require("express");
const loginController = require("../../controllers/User/loginController")
const registerController = require("../../controllers/User/registerController");
const userHandler= Router();

userHandler.post("/login", async(req, res)=>{
    try {
        if(!req.body) res.status(400).json({answer: "Sorry, if theres no information, we can´t continue."})

        const response = await loginController(req.body);
        response.token? res.status(200).json(response): res.status(400).json(response);
    } catch (error) {
        res.status(500).json(error)
    }
})
userHandler.post("/register", async(req, res)=>{
    try {
        if(!req.body) res.status(400).json({answer: "Sorry, if theres no information, we can't continue."})
        else if(!req.body.newUser|| !req.body.newEmployee) res.status(400).json({answer: "Sorry, you're missing one of the inputs of the information, we can't continue."})
        const response = await registerController(req.body.newUser, req.body.newEmployee);

        response.user? res.status(201).json(response): res.status(400).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports= userHandler;