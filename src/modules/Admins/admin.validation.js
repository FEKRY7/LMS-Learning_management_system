const joi = require("joi");


//joi validation for creating Exam
const UpdateAdmin = joi
  .object({
    Name: joi.string().required().messages({
        'any.required': 'Name is required'
    }),
    email: joi.string().required().email()
  })
  .required();




module.exports = {
    UpdateAdmin
};
