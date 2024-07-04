const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for ExsamResult
const publishedExsamResult = joi
  .object({
    IsPublished: joi.boolean().required(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for  check ExsamResult
const checkExsamResult = joi
  .object({
    examId: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for fetch ExsamResul
const fetchExsamResult = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

module.exports = {
  publishedExsamResult,
  checkExsamResult,
  fetchExsamResult,
};
