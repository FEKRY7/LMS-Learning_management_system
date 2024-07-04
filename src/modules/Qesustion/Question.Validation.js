const joi = require("joi");
const {
  isValidObjectId,
} = require("../../middleware/validation.middleware.js");

//joi validation for Creating Question
const Updatequestion = joi
  .object({
    Question: joi.string(),
    optionA: joi.string(),
    optionB: joi.string(),
    optionC: joi.string(),
    optionD: joi.string(),
    correctAnswer: joi.string(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for get Question
const GetQuestionById = joi
  .object({
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

//joi validation for create Questioon
const createQuestioon = joi
  .object({
    Question: joi.string().required(),
    optionA: joi.string().required(),
    optionB: joi.string().required(),
    optionC: joi.string().required(),
    optionD: joi.string().required(),
    correctAnswer: joi.string().required(),
    id: joi.string().custom(isValidObjectId).required(),
  })
  .required();

module.exports = {
  Updatequestion,
  GetQuestionById,
  createQuestioon,
};
