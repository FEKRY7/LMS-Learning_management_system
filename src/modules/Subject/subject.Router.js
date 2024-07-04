const express = require("express");
const router = express.Router();
const { validation } = require("./../../middleware/validation.middleware.js");
const isAuthenticated = require("../../middleware/authentication.middeleware.js");
const { isAuthorized } = require("../../middleware/authoriztion.middelware.js");

const {
  Createsubject,
  GetSubjectById,
  updateSubject,
} = require("./subject.validation.js");

const {
  Craetesubject,
  Getsubjecs,
  GetSinglesubject,
  Updatesubject,
  Deletesubject,
} = require("./SubjectController.js");

//Subject routers
router.post(
  "/:id",
  validation(Createsubject),
  isAuthenticated,
  isAuthorized("Admin"),
  Craetesubject
);

router.get(
  "/",
  isAuthenticated,
  isAuthorized("Admin"),
  Getsubjecs
);

router.get(
  "/subjectById/:id",
  validation(GetSubjectById),
  isAuthenticated,
  isAuthorized("Admin"),
  GetSinglesubject
);

router.put(
  "/:id",
  validation(updateSubject),
  isAuthenticated,
  isAuthorized("Admin"),
  Updatesubject
);

router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  Deletesubject
);

module.exports = router;
