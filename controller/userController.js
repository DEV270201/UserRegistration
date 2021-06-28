const User = require("../model/userModel");
const { DatabaseError, ClientError } = require("../utils/Errors");
// const validateInput = require("../Joi/UserJoi");

exports.Register = async (userCredentials) => {
    try {
        const user = await User.findOne({ username: userCredentials.username });
        if (user) {
            throw new ClientError("User already exists!!");
        }
        const userObj = {
            name: userCredentials.name,
            username:  userCredentials.username,
            password: userCredentials.password,
            age : userCredentials.age,
        };
        await User.create(userObj);
        return;
    } catch (err) {
        // console.log(err);
          if(err.statusCode === 400)
            throw err;
          else
            throw new DatabaseError("something went wrong!!");
    }
}




// try {
//     const userCredentials = await validateInput({ ...req.body });
//     const { name, username, password } = userCredentials;
//     const user = await User.findOne({ username: username });
//     if (user) {
//         throw new ClientError("User already exists!!");
//     }
//     const userObj = {
//         name: name,
//         username: username,
//         password: password,
//     };
//     await User.create(userObj);
//     res.status(201).json({
//         status: "success",
//         message: "User registered successfully",
//     });
// } catch (err) {
//     // console.log(err);
//       if(err.statusCode === 400)
//         return next(err);
//       else
//         return next(new DatabaseError("something went wrong!!"));
// }

// try{
//     if (password !== password2) {
//         let error = new Error("passwords are not matching!!");
//         throw error;
//     }
// }catch(error){
//     error.statusCode = 400;
//     error.status = "Fail";
//     return next(error);  //by returning it , this error will be handled by the global error middleware
// }