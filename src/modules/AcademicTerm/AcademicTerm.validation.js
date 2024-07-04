const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for creating AcademicTerm
const craetAcademicTerm = joi
  .object({
    Name: joi.string().required().messages({
      "any.required": "id is required",
    }),
    description: joi.string().required(),
  })
  .required();

//joi validation for get AcademicTerm
const GetAcademicTermById = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for update AcademicTerm
const updateAcademicTerm = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
    Name: joi.string(),
    fromYear: joi.string(),
    ToYear: joi.string(),
  })
  .required();

module.exports = {
  craetAcademicTerm,
  GetAcademicTermById,
  updateAcademicTerm,
};
