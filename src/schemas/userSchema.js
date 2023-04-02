import joi from "joi";

 const signup = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
});

const signin= joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });


const signupdoc = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  specialty: joi.string().required(),
  address: joi.string().required(),
  checkin: joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  checkout: joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
})


  export default {
    signup, 
    signin, 
    signupdoc
  }