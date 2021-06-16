const express = require("express");
const userController = require("../controller/userController");
const validateInput = require("../Joi/UserJoi");
const passport = require("passport");
// const { AuthenticationError } = require("../Errors");
const AuthMiddleware = require("../Auth/AuthMiddleware");

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

router.get("/dashboard",AuthMiddleware,(req,res,next)=>{
    res.render("dashboard" , {user : req.user , title : "Dashboard"});
})

router.get("/profile",AuthMiddleware,(req,res)=>{
    console.log(req.session.cookie.maxAge);
    console.log(req.sessionID);
    res.render("profile" , {user : req.user , title : "Profile"});
})

router.get("/logout",(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect("/");
})

router.post("/register",async (req,res,next)=>{
 try { 
    const userCredentials = await validateInput({...req.body});
    await userController.Register(userCredentials);
    res.redirect("/login");
}catch(err){
   next(err);
}
});

router.post("/login",passport.authenticate("local"),(req,res,next)=>{
    try{
        res.redirect("/");
    }catch(err){
        console.log("error occurred");
        next(err);
    }
});


    //success message
    // res.status(201).json({
    //     status : "success",
    //     message : "User registered successfully",
    // });
module.exports = router;