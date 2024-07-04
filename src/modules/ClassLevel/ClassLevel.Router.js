const express = require("express");
const router = express.Router();
const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  CraetClassLevel,
  GetClassLevelById,
  updateClassLevel
} = require("./ClassLevel.validation.js");

const {
  CraeteClassLevel,
  GetAcademicClassLevels,
  GetSingleAcademicClassLevel,
  UpdateAcademicClassLevel,
  DeleteAcademicTerm
} = require("./ClassLevelController.js");

// ClassLevelRoutes
router.post(
  "/",
  validation(CraetClassLevel),
  isAuthenticated,
  isAuthorized("Admin"),
  CraeteClassLevel
);

router.get(
  "/",
  isAuthenticated,
  isAuthorized("Admin"),
  GetAcademicClassLevels
);

router.get(
  "/:id",
  validation(GetClassLevelById),
  isAuthenticated,
  isAuthorized("Admin"),
  GetSingleAcademicClassLevel
);

router.put(
  "/:id",
  validation(updateClassLevel),
  isAuthenticated,
  isAuthorized("Admin"),
  UpdateAcademicClassLevel
);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  DeleteAcademicTerm
);

module.exports = router;
