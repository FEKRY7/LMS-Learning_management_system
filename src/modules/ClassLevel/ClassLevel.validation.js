const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for creating ClassLevel
const CraetClassLevel = joi
  .object({
    Name: joi.string().required().messages({
      "any.required": "id is required",
    }),

    description: joi.string().required(),
  })
  .required();

//joi validation for get ClassLevel
const GetClassLevelById = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for update ClassLevel
const updateClassLevel = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
    Name: joi.string().required(),
    description: joi.string().required(),
  })
  .required();

module.exports = {
  CraetClassLevel,
  GetClassLevelById,
  updateClassLevel,
};
