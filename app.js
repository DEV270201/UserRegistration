const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const {NotFoundError} = require("./Errors");

if(process.env.NODE_ENV === "development"){
    console.log("in the development stage");
}

app.use((req,res,next)=>{
    console.log("middleware");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(`${__dirname}/public`));
app.use(userRouter);


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