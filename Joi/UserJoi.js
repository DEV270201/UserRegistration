const Joi = require("joi");
const {ClientError} = require("../Errors");

const validateInput = async(args)=>{
//created the schema for validation
   const schema = Joi.object({
     name : Joi.string().min(2).max(20).required().error(new ClientError("Name must be greater than 2 characters and less than 20 characters")),

     username : Joi.string().alphanum().required().error(new ClientError("Username is required")),

     age : Joi.number().required().error(new ClientError("Enter a valid age")),

     password : Joi.string().max(20).required().error(new ClientError("Password is required and should be less than 20 characters")),

     password2 : Joi.ref("password"),
   });
   return await schema.validateAsync(args);
}

module.exports = validateInput;