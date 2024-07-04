const express = require("express");
const router = express.Router();

const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
    craetAcademicYear,
  GetAcademicYearById,
  updateAcademicYear,
} = require("./AcademicYear.validation.js");

const {
  CraeteAcademicYear,
  GetAcademicYears,
  GetSingleAcademicYear,
  UpdateAcademicYear,
  DeleteAcademicYear,
} = require("./AcademicYearController.js");

//AcademicYear
router.post(
  "/",
  validation(craetAcademicYear),
  isAuthenticated, 
  isAuthorized("Admin"),
  CraeteAcademicYear
);

router.get("/", isAuthenticated, isAuthorized("Admin"), GetAcademicYears);

router.get(
  "/:id",
  validation(GetAcademicYearById),
  isAuthenticated,
  isAuthorized("Admin"),
  GetSingleAcademicYear
);

router.put(
  "/:id",
  validation(updateAcademicYear),
  isAuthenticated,
  isAuthorized("Admin"),
  UpdateAcademicYear
);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  DeleteAcademicYear
);

module.exports = router;
