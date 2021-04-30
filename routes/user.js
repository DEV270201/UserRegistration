const express = require("express");
const userController = require("../controller/userController");
const validateInput = require("../Joi/UserJoi");

const router = express.Router();

router.post("/register",async (req,res,next)=>{
    const userCredentials = await validateInput(req.body);
    await userController.Register(userCredentials);
    res.status(201).json({
        status : "success",
        message : "User registered successfully",
    });
});

module.exports = router;