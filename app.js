const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const {NotFoundError} = require("./Errors");
const passport = require("passport");
// const cookieSession = require("cookie-session");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash"); //used for flashing messages on redirects
require("./passport")(passport);


if(process.env.NODE_ENV === "development"){
    console.log("in the development stage");
}

//set the view engine
app.set("view engine" , "ejs");

//body-parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const sessionStore = MongoStore.create({
    mongoUrl : process.env.DATABASE,
    mongoOptions : {
        useUnifiedTopology : true,
    },
    collectionName : process.env.SessionTable,
});

//cookie
// app.use(cookieSession({
//     name : "Authenticator",
//     maxAge : 86400 * 1000,
//     keys : [process.env.CookieKey],
//     // secure : true,
//     // resave : false,
// }))

//lets try to use express session
app.use(session({
    secret : process.env.CookieKey,
    resave : false,
    saveUninitialized : false,
    store : sessionStore,
    rolling : true,  //it extends the period by maxAge of the cookie on every request
    cookie : {
        maxAge : 5 * 60 * 1000, //if the user is inactive for more than 5 minutes then the user will be logged out of the session
        secure : false,
    }
}));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//since the flash messages are stored in the sessions , so first set up the sessions
app.use(flash());

//global variables .... can be used inside views only
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

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