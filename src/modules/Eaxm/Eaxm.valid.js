const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for creating Exam
const CraeteExam = joi
  .object({
    Name: joi.string().required().messages({
      "any.required": "id is required",
    }),
    description: joi.string().required(),
    examTime: joi.string().required(),
    examDate: joi.string().required(),
    examType: joi.string().required(),

  })
  .required();

//joi validation for get Exam
const GetEaxmById = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for write exam
const writeExam = joi
  .object({
    id: joi.string().custom(isValidObjectId).required().messages({
      "any.required": "id is required",
    }),
    Answers: joi.array().required(),
  })
  .required();

module.exports = {
  CraeteExam,
  GetEaxmById,
  writeExam,
};
