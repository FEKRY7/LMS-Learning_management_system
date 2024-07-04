const express = require("express");
const router = express.Router();
const { validation } = require("../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  getStudentById,
  UpdatestudentPofile,
  UpdatestudentData,
  activateAcountSchema,
} = require("./student.validation.js");

const {
  UpdateStudentProfile,
  UpdateStudentData,
  GetStudent,
  GetStudentProfile,
  GetStudentById,
  promotingStudent,
  activeAccount,
  Refreshtoken,
} = require("./Student.controller.js");

//update Student
router.put(
  "/",
  validation(UpdatestudentPofile),
  isAuthenticated,
  isAuthorized("student"),
  UpdateStudentProfile
);

//Update  Student Profile
router.put(
  "/:id",
  validation(UpdatestudentData),
  isAuthenticated,
  isAuthorized("Admin"),
  UpdateStudentData
);

// Get All Students
router.get("/", isAuthenticated, isAuthorized("Admin"), GetStudent);

// Get  Student Profile
router.get(
  "/profile",
  isAuthenticated,
  isAuthorized("student"),
  GetStudentProfile
);

// Get  Student ById
router.get(
  "/singleUser/:id",
  validation(getStudentById),
  isAuthenticated,
  isAuthorized("Admin"),
  GetStudentById
);

router.post(
  "/promoting/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  promotingStudent
);

// active Teacher Account
router.get(
  "/activat_account/:token",
  validation(activateAcountSchema),
  activeAccount
);

//Refresh Token
router.post("/refreshtoken", Refreshtoken);

module.exports = router;
