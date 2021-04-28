const express = require("express");
const app = express();

if(process.env.NODE_ENV === "development"){
    console.log("in the development stage");
    console.log(__dirname);
}

app.use((req,res,next)=>{
    console.log("middleware");
    next();
});

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

module.exports = app;