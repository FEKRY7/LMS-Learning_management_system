const joi = require("joi");
 
const Register = joi
  .object({
    Name: joi.string().required(),
    email: joi.string().required().email(),
    role: joi.string().required(),
    password: joi.string().required(),
  })
  .required();

const AdminRegister = joi
  .object({
    Name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
  })
  .required();

const activateAcountSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();

const Login = joi.object({
  email: joi.string().required().email(),
  role: joi.string().required(),
  password: joi.string().required(),
});



module.exports = {
  Register,
  AdminRegister,
  activateAcountSchema,
  Login,
};
