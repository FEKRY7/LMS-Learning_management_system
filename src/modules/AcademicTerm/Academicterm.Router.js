const express = require("express");
const router = express.Router();

const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  craetAcademicTerm,
  GetAcademicTermById,
  updateAcademicTerm,
} = require("./AcademicTerm.validation.js");

const {
  CraeteAcademicTerm,
  GetAcademicTerms,
  GetSingleAcademicTerm,
  UpdateAcademicterm,
  DeleteAcademicTerm
} = require("./AcademictermController.js");

//AcademicTerm routers
router.post(
  "/",
  validation(craetAcademicTerm),
  isAuthenticated,
  isAuthorized("Admin"),
  CraeteAcademicTerm
);
router.get(
  "/",
  isAuthenticated,
  isAuthorized("Admin"),
  GetAcademicTerms
); 
router.get(
  "/:id",
  validation(GetAcademicTermById),
  isAuthenticated,
  isAuthorized("Admin"),
  GetSingleAcademicTerm
);
router.put(
  "/:id",
  validation(updateAcademicTerm),
  isAuthenticated,
  isAuthorized("Admin"),
  UpdateAcademicterm
);
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  DeleteAcademicTerm
);

module.exports = router;
