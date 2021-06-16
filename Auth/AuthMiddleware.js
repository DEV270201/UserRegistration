const {AuthenticationError} = require("../Errors");


const AuthMiddleware = (req,res,next)=>{
   if(!req.user){
     res.redirect("/login");
   }else{
    next();
   }
 
}

module.exports = AuthMiddleware;