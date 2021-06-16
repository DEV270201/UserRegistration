const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const {NotFoundError} = require("./Errors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport")(passport);

if(process.env.NODE_ENV === "development"){
    console.log("in the development stage");
}

//set the view engine
app.set("view engine" , "ejs");

//body-parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//cookie
app.use(cookieSession({
    name : "Authenticator",
    maxAge : 86400 * 1000,
    keys : [process.env.CookieKey],
    // secure : true,
    // resave : false,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//static files middleware
app.use(express.static(`${__dirname}/public`));
console.log("-------------------------------------------------------------------");

//route middleware
app.use(userRouter);

//custom middleware   -> this middleware would never run because the request made to any route will execute the route middleware
app.use((req,res,next)=>{
    console.log("middleware");
    next();
});

//middleware for the unhandled routes
app.all("*",(req,res,next)=>{
   return next(new NotFoundError("Sorry, the requested page is not available"));  //passing the error to the global middleware
});

//global error middleware
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Fail";
    res.status(err.statusCode).json({
        statusCode : err.statusCode,
        status : err.status,
        message : err.message,
    });
})

module.exports = app;