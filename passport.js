const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./model/userModel");
const {AuthenticationError,ClientError} = require("./Errors");
const bcrypt = require("bcryptjs");

//using the local strategy
const Authentication = (pass_port) => {

//STEP 1
    //username and password  should be equal to the name string in login form
    pass_port.use(new LocalStrategy(async (username,password,done)=>{

    console.log("hello passport");
    //find the user
     try{
         const user = await User.findOne({
             username : username,
         })

      if(!user){
          console.log("user not found");
          throw new AuthenticationError("User not registered");
      }

    //match the password
    const matched = await bcrypt.compare(password , user.password);

    //if the password is incorrect we throw an error
    if(!matched){
        throw new ClientError("Please check your password");
    }

    console.log("user found!!");
    done(null,user);

     }catch(err){
         //check the errors
         if(err.statusCode === 400 || err.statusCode === 401){
             console.log(err);
             return done(null,false, { message : err.message });
         }else{
            console.log("b2");
            //if the problem is occurred from the server side then we simply pass the user
            return done(err);
         }
     }
}));

//STEP 2

//serializing the user i.e sending some unique property which will be stuffed inside the cookie
passport.serializeUser((user,done)=>{
   console.log("serializing");
   done(null,user.id);

});


//STEP 3

//we will grab the unique property to find the user who has requested the page
passport.deserializeUser(async (id,done)=>{
   console.log("deserializing");

  const user = await  User.findById(id);
  console.log(user);
  done(null,user);
})

}


module.exports = Authentication;