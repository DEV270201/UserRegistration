const User = require("../model/userModel");
const {DatabaseError} = require("../Errors");

exports.Register = async (userCredentials) => {
    try {
        console.log("hello");
        // const { name, username, password, password2 } = req.body;
        let name = userCredentials.name;
        let username = userCredentials.username;
        let password = userCredentials.password;
        console.log("passwords are matching");
        const userObj = {
            name: name,
            username: username,
            password: password,
        };
        await User.create(userObj);
        return;
    } catch (err) {
        return next(new DatabaseError("something went wrong!!"));
    }
}



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