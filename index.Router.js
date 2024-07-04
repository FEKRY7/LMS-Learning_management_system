const express = require("express");

const userRouter = require("./src/modules/auth/auth.routes.js");
const AdminRouter = require("./src/modules/Admins/adminRouter.js");
const AcademicYearRouter = require("./src/modules/AcademicYear/AcademicYear.Router.js");
const AcademicTermRouter = require("./src/modules/AcademicTerm/Academicterm.Router.js");
const ClassLevelRouter = require("./src/modules/ClassLevel/ClassLevel.Router.js");
const ProgramRouter = require("./src/modules/program/program.Router.js");
const SubjectRouter = require("./src/modules/Subject/subject.Router.js");
const YearGroupRouter = require("./src/modules/YearGroub/YearGroup.Router.js");
const TeacherRouter = require("./src/modules/Teacher/Teacher.Router.js");
const ExamRouter = require("./src/modules/Eaxm/Eaxm.routes.js");
const StudentRouter = require("./src/modules/Student/StudentRouter.js");
const QuestionRouter = require("./src/modules/Qesustion/Questions.Router .js");
const ResultRouter = require("./src/modules/Result/Result.Router.js");
const mongoConnection = require("./Database/dbConnection.js");

const AppRouter = (app) => {
  mongoConnection();
  //convert Buffer Data
  // Middleware to parse JSON
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Routes
  app.use("/api/auth", userRouter);
  app.use("/api/Admins", AdminRouter);
  app.use("/api/AcademicYear", AcademicYearRouter);
  app.use("/api/AcademicTerm", AcademicTermRouter);
  app.use("/api/ClassLevel", ClassLevelRouter);
  app.use("/api/Program", ProgramRouter);
  app.use("/api/Subject", SubjectRouter);
  app.use("/api/YearGroup", YearGroupRouter);
  app.use("/api/Teacher", TeacherRouter);
  app.use("/api/Exam", ExamRouter);
  app.use("/api/Student", StudentRouter);
  app.use("/api/Question", QuestionRouter);
  app.use("/api/Result", ResultRouter);
};

module.exports = AppRouter;
