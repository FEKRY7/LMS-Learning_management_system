const express = require("express");
const router = express.Router();
const { validation } = require("../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  Updatequestion,
  GetQuestionById,
  createQuestioon,
} = require("./Question.Validation.js");

const {
  CraeteQuestion,
  GetQuestions,
  GetSingleQuestion,
  UpdateQuestion,
  DeleteQuestion,
} = require("./Question.controller.js");

//Question routers
router.post(
  "/:id",
  validation(createQuestioon),
  isAuthenticated,
  isAuthorized("Teacher"),
  CraeteQuestion
);

router.get("/", isAuthenticated, isAuthorized("Teacher"), GetQuestions);

router.get(
  "/:id",
  validation(GetQuestionById),
  isAuthenticated,
  isAuthorized("Teacher"),
  GetSingleQuestion
);

router.put(
  "/:id",
  validation(Updatequestion),
  isAuthenticated,
  isAuthorized("Teacher"),
  UpdateQuestion
);

router.delete("/:id", isAuthenticated, isAuthorized("Teacher"), DeleteQuestion);

module.exports = router;
