const express = require("express");
const router = express.Router();
const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  CraeteYearGroub,
  GetYearGroub,
  UpdateYaerGroub,
} = require("./YearGroub.Validation.js");

const {
  CraeteYearGroup,
  GetYearGroup,
  GetSingleYearGroup,
  UpdateYearGroup,
  DeleteYearGroup,
} = require("./YearGroupController.js");

//Year Group routers
router.post(
  "/:id",
  validation(CraeteYearGroub),
  isAuthenticated,
  isAuthorized("Admin"),
  CraeteYearGroup
);

router.get("/", isAuthenticated, isAuthorized("Admin"), GetYearGroup);

router.get(
  "/:id",
  validation(GetYearGroub),
  isAuthenticated,
  isAuthorized("Admin"),
  GetSingleYearGroup
);

router.put(
  "/:id",
  validation(UpdateYaerGroub),
  isAuthenticated,
  isAuthorized("Admin"),
  UpdateYearGroup
);

router.delete("/:id", isAuthenticated, isAuthorized("Admin"), DeleteYearGroup);

module.exports = router;
