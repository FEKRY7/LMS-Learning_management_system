const express = require("express");
const router = express.Router();

const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
UpdateAdmin,
} = require("./admin.validation.js");

const {
  UpdateAdminProfile,
  AdminsList,
  AdminProfile
} = require("./Admin.controller.js");

//update Amin
router.put(
  "/",
  validation(UpdateAdmin),
  isAuthenticated,
  isAuthorized("Admin"),
  UpdateAdminProfile
);

//Get All admin
router.get("/", isAuthenticated, isAuthorized("Admin"), AdminsList);

// Get  AdminProfile
router.get("/profile", isAuthenticated, isAuthorized("Admin"), AdminProfile);

module.exports = router;
