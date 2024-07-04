const express = require("express");
const router = express.Router();
const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  Register,
  AdminRegister,
  activateAcountSchema,
  Login,
} = require("./auth.schema..js");

const {
  Adminregister,
  activeAccount,
  UpgradeUserRole,
  GetAllStududents,
  UserRegister,
  login,
  Refreshtoken
} = require("./auth.controller.js");

router.post("/AdminRegister", validation(AdminRegister), Adminregister);

router.post(
  "/register",
  validation(Register),
  isAuthenticated,
  isAuthorized("Admin"),
  UserRegister
);

router.get(
  "/activat_account/:token",
  validation(activateAcountSchema),
  activeAccount
);

router.post("/login",validation(Login),login)


router.put(
  "/upgrade-role/:userId",
  isAuthenticated,
  isAuthorized("admin"),
  UpgradeUserRole
);
router.get(
  "/students",
  isAuthenticated,
  isAuthorized("admin"),
  GetAllStududents
);

//Refresh Token
router.post("/refreshtoken",Refreshtoken)

module.exports = router;
