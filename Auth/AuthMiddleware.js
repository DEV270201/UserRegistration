const {AuthenticationError} = require("../Errors");


const AuthMiddleware = (req,res,next)=>{
   if(!req.user){
       throw new AuthenticationError("user not logged in!!");
   }
   next();
}

module.exports = AuthMiddleware;