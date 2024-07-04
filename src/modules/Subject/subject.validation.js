const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for Creating subject
const Createsubject = joi
  .object({
    Name: joi.string().required(),
    Academicterm: joi.string().required(),
    description:joi.string().required(),
    duration:joi.string(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for get subject
const GetSubjectById = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for update subject
const updateSubject = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
    Name: joi.string(),
    Academicterm: joi.string(),
    description:joi.string(),
    duration:joi.string(),
  })
  .required();

module.exports = {
  Createsubject,
  GetSubjectById,
  updateSubject,
};

