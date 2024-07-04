const express = require("express");
const router = express.Router();
const { validation } = require("../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const { CraeteExam, GetEaxmById, writeExam } = require("./Eaxm.valid.js");

const {
  CraetExam,
  GetExams,
  GetExamById,
  UpdateExam,
  WriteExam,
  DeleteExam,
} = require("./Eaxm.controller.js");

// router.use("/:examId/Result", ResualtRouter); // internal navigate
 
//Exam routers
router.post(
  "/", 
  validation(CraeteExam),
  isAuthenticated,
  isAuthorized("Teacher"),
  CraetExam
);
 
// fetched Exams
router.get("/", isAuthenticated, isAuthorized("Admin"), GetExams);

// fetched  spacefic Exam
router.get(
  "/spaceficExam/:id",
  validation(GetEaxmById),
  isAuthenticated,
  isAuthorized("Admin"),
  GetExamById
);

// update Exam by id
router.put("/:id", isAuthenticated, isAuthorized("Teacher"), UpdateExam);

// Student get and write exam
router.post(
  "/write/:id",
  validation(writeExam),
  isAuthenticated,
  isAuthorized("student"),
  WriteExam
);

// Delete Exam
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Admin", "Teacher"),
  DeleteExam
);

module.exports = router;
