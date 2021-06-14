const express = require("express");
const userController = require("../controller/userController");
const validateInput = require("../Joi/UserJoi");
const passport = require("passport");

const router = express.Router();

router.get("/",(req,res)=>{
    res.render("home" , {title : "Authenticator"});
});

router.get("/register",(req,res)=>{
    res.render("register" , {title : "Registration Page"});
})

router.get("/login",(req,res)=>{
    res.render("login" , {title : "Login Page"});
});

router.post("/register",async (req,res,next)=>{
 try { 
    const userCredentials = await validateInput({...req.body});
    await userController.Register(userCredentials);
    res.redirect("/login");
    // res.status(201).json({
    //     status : "success",
    //     message : "User registered successfully",
    // });
}catch(err){
   next(err);
}
});

router.post("/login",passport.authenticate("local"),(req,res,next)=>{
    try{
        res.json({
            Data : "hello",
        })
    }catch(err){
        console.log("error occurred");
        next(err);
    }
});

module.exports = router;