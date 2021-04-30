const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
    },
    username : {
        type : String,
        unique : [true,"User already exists!"],
    },
    password : {
        type : String,
    },
    password2 : {
        type : String,
    },
});

const User = new mongoose.model("User",userSchema);

module.exports = User;