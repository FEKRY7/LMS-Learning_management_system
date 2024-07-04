const express = require("express");
const router = express.Router();
const { validation } = require("../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  assiginTeacherRole,
  GetTeachers,
  UpdateTeacherPofile,
  activateAcountSchema,
  refreshtoken
} = require("./Teacher.validation.js");

const {
  GetTeacher,
  GetTeacherById,
  GetTeacherProfile,
  assigningTeacherRole,
  UpdateTeacherProfile,
  activeAccount,
  Refreshtoken
} = require("./Teacher.controller.js");

//update Teacher
router.put(
  "/:id",
  validation(UpdateTeacherPofile),
  isAuthenticated,
  isAuthorized("Teacher"),
  UpdateTeacherProfile
);

//UPdate TeacherBY Admin
router.put(
  "/Admin/:id",
  validation(assiginTeacherRole),
  isAuthenticated,
  isAuthorized("Admin"),
  assigningTeacherRole
);

//Get All Teachers
router.get(
  "/",
  validation(GetTeachers),
  isAuthenticated,
  isAuthorized("Admin"),
  GetTeacher
);

// Get  Teacher ById
router.get(
  "/profile",
  isAuthenticated,
  isAuthorized("Teacher"),
  GetTeacherProfile
);
 
// Get  Teacher ById
router.get(
  "/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  GetTeacherById
);

// active Teacher Account 
router.get(
  "/activat_account/:token",
  validation(activateAcountSchema),
  activeAccount
);

//Refresh Token
router.post("/refreshtoken",Refreshtoken)

module.exports = router;
