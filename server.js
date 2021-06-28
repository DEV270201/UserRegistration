const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});
const app = require("./app");
const mongoose = require("mongoose");


const database_connection = async () =>{
    try{
     const obj = await mongoose.connect(process.env.DATABASE , {
            useNewUrlParser : true,
            useCreateIndex : true,
            useUnifiedTopology: true,
            useFindAndModify : false,
        });
     console.log("db connected successfully");
    }catch(err){
        console.log("sorry , not connected");
    }
}

database_connection();

const port = process.env.PORT || 3001;
const server = app.listen(port , ()=>{
   console.log(`server listening on port ${port}`); 
});