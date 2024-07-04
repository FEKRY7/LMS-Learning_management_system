const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for Craete YearGroub
const CraeteYearGroub = joi
  .object({
    Name: joi.string().required(),
    description: joi.string().required(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for Get YearGroub
const GetYearGroub = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for update YearGroub
const UpdateYaerGroub = joi
  .object({
    Name: joi.string(),
    description: joi.string(),
    AcademicYaer: joi.string(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

module.exports = {
    CraeteYearGroub,
    GetYearGroub,
    UpdateYaerGroub
};
