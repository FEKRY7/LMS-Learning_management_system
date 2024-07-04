const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for Get Exam
const getStudentById = joi
  .object({
    id: joi.string().custom(isValidObjectId).required().messages({
      "any.required": "id is required",
    }),
  })
  .required();

//joi validation for updatePofile Student
const UpdatestudentPofile = joi
  .object({
    Name: joi.string().messages({
      "any.required": "id is required",
    }),
    email: joi.string().email(),
    password: joi.string(),
  })
  .required();

//joi validation for update Student
const UpdatestudentData = joi
  .object({
    id: joi.string().custom(isValidObjectId).required().messages({
      "any.required": "id is required",
    }),
    subjects: joi.string(),
    AcademicYear: joi.string(),
    program: joi.string(),
    classLevels: joi.string(),
    IsSuspended: joi.boolean(),
    Iswitdrawn: joi.boolean(),
  })
  .required();

const activateAcountSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();

module.exports = {
  getStudentById,
  UpdatestudentPofile,
  UpdatestudentData,
  activateAcountSchema,
};
