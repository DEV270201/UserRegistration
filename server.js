const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const app = require("./app");

const port = process.env.PORT || 3001;
const server = app.listen(port , ()=>{
   console.log(`server listening on port ${port}`); 
});