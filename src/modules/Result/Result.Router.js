const express = require("express");
const router = express.Router();
const { validation } = require("../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  publishedExsamResult,
  checkExsamResult,
} = require("./resualt.Validation.js");

const {
  CheckExamResult,
  PublishedExamResult,
} = require("./ExamResualt.Controller.js");

//ExamResult routers
router.get(
  "/:examId",
  validation(checkExsamResult),
  isAuthenticated,
  isAuthorized("student"),
  CheckExamResult
);

router.put(
  "/:id",
  validation(publishedExsamResult),
  isAuthenticated,
  isAuthorized("Admin"),
  PublishedExamResult
);

module.exports = router;
