const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for Creating Program
const CreateProgram = joi
  .object({
    Name: joi.string().required().messages({
      "any.required": "id is required",
    }),

    description: joi.string().required(),
    code: joi.string().required(),
  })
  .required();

//joi validation for get Program
const GetProgramById = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for update Program
const updateProgram = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),

    Name: joi.string().messages({
      "any.required": "id is required",
    }),

    duration: joi.string(),
    description: joi.string(),
    code: joi.string(),
  })
  .required();

module.exports = {
  CreateProgram,
  GetProgramById,
  updateProgram,
};
