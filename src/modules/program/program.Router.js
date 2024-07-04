const express = require("express");
const router = express.Router();
const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  CreateProgram,
  GetProgramById,
  updateProgram
} = require("./program.validation.js");

const {
  Craeteprogram,
  Getprograms,
  GetSingleprogram,
  Updateprogram,
  DeleteProgram
} = require("./programController.js");

//Program Routers
router.post(
  "/",
  validation(CreateProgram),
  isAuthenticated,
  isAuthorized("Admin"),
  Craeteprogram
);

router.get("/", isAuthenticated, isAuthorized("Admin"), Getprograms);

router.get(
  "/:id",
  validation(GetProgramById),
  isAuthenticated,
  isAuthorized("Admin"),
  GetSingleprogram
);

router.put(
  "/:id",
  validation(updateProgram),
  isAuthenticated,
  isAuthorized("Admin"),
  Updateprogram
);

router.delete("/:id", isAuthenticated, isAuthorized("Admin"), DeleteProgram);

module.exports = router;
