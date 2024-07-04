const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for assginnig responsability to teacher
const assiginTeacherRole = joi
  .object({
    AcademicYear: joi.string(),
    Academicterm: joi.string(),
    program: joi.string(),
    classLevel: joi.string(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for get teacher
const GetTeachers = joi
  .object({
    page: joi.number(),
    size: joi.number(),
  })
  .required();

//joi validation for UpdateTeacherPofile
const UpdateTeacherPofile = joi
  .object({
    Name: joi.string().messages({
      "any.required": "id is required",
    }),
    email: joi.string().email(),
    password: joi.string(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

const activateAcountSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();

module.exports = {
  assiginTeacherRole,
  GetTeachers,
  UpdateTeacherPofile,
  activateAcountSchema,
};
