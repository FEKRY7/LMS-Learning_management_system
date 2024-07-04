const joi = require("joi");
const { isValidObjectId } = require('../../middleware/validation.middleware.js')

//joi validation for creating AcademicYear
const craetAcademicYear = joi.object({
    Name: joi.string().required().messages({
        "any.required": "Name is required",
      }),
      fromYear: joi.date().required(),
      ToYear: joi.date().required(),
}).required()

//joi validation for get AcademicYear
const GetAcademicYearById = joi.object({
  id: joi.string().custom(isValidObjectId).required(),
}).required();

//joi validation for update AcademicYear
const updateAcademicYear = joi.object({
    id: joi.string().custom(isValidObjectId).required(),
      Name: joi.string(),
      fromYear: joi.date(),
      IsCurrent: joi.boolean(),
      ToYear: joi.date(),
}).required()

module.exports = {
  craetAcademicYear,
  GetAcademicYearById,
  updateAcademicYear,
};
