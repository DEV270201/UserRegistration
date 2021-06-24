const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { number } = require("joi");


const userSchema = mongoose.Schema({
    name : {
        type : String,
    },
    username : {
        type : String,
        // unique : [true,"User already exists!"],
    },
    age : {
        type : Number,
    },
    password : {
        type : String,
    },
    password2 : {
        type : String,
    },
});

//pre hook middleware
userSchema.pre("save",async function(next){
// generating the salt
let genSalt = await bcrypt.genSalt(10);
// adding the generated salt to the password and producing a unique hash
let hash = await bcrypt.hash(this.password,genSalt);
// replacing the password with the generated hash
this.password = hash;  
next();
});

const User = new mongoose.model("User",userSchema);

module.exports = User;