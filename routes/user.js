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
});

router.post("/register",async (req,res)=>{
    try { 
       console.log(req.body);
       const userCredentials = await validateInput({...req.body});
       await userController.Register(userCredentials);

       //first we set the flash message that we want to use
       req.flash("success_msg","User registered successfully");
       res.redirect("/login");

   }catch(err){
      if(err.message.includes("ref")){
          err.message = "Passwords not matching!";
      }
      req.flash("error_msg",err.message);
      res.redirect("/register");
   }
   });


router.get("/login",(req,res)=>{
    console.log(req.flash("error_msg"));
    console.log(req.flash("success_msg"));
    res.render("login" , {title : "Login Page"});
});

router.post("/login",passport.authenticate("local",{
    failureRedirect : "/login",
    successRedirect : "/dashboard",
    failureFlash : true,
    successFlash : "User logged in successfully",
}),(req,res,next)=>{});

//for login page
// try{
//     res.redirect("/dashboard");
// }catch(err){
//     console.log("error occurred");
//     res.render("login",{title : "Login Page" , message : err.message});
//     // next(err);
// }

router.get("/dashboard",AuthMiddleware,(req,res,next)=>{
    res.render("dashboard" , {user : req.user , title : "Dashboard"});
});

router.get("/profile",AuthMiddleware,(req,res)=>{
    console.log(req.session.cookie.maxAge);
    console.log(req.sessionID);
    res.render("profile" , {user : req.user , title : "Profile"});
});

router.get("/logout",(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect("/");
});



    //success message
    // res.status(201).json({
    //     status : "success",
    //     message : "User registered successfully",
    // });
module.exports = router;