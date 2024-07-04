const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../../utils/sendEmail.js");
const signUpTemplate = require("../../utils/htmlTemplets.js");
const { selectModel } = require("../../middleware/authoriztion.middelware.js");
const studentModel = require("../../../Database/model/Academic/StudentModel.model.js");
const ExamResultModel = require("../../../Database/model/Academic/ExamResualt.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

// Get Students
const GetStudent = async (req, res, next) => {
  try {
    const Students = await studentModel.find({}).select("Name email role");
    if (!Students) {
      return First(res, "not found any Students", 404, http.FAIL);
    }
    return Second(
      res,
      ["Done this is Students List", { Students }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// Get Student BY_ID
const GetStudentById = async (req, res, next) => {
  try {
    const Student = await studentModel
      .findById(req.params.id)
      .select("Name email role");
    if (!Student) {
      return First(res, "Student not found", 404, http.FAIL);
    }
    return Second(
      res,
      ["Done this is Student", { Student }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

//Get Student profile
const GetStudentProfile = async (req, res, next) => {
  try {
    const Student = await studentModel.findById(req.user._id);
    // .populate("examResults");
    if (!Student) {
      return First(res, "Student not found", 404, http.FAIL);
    }
    console.log(Student);

    const StudentProfile = {
      Name: Student.Name,
      email: Student.email,
      classLevels: Student.classLevels,
      AcademicYear: Student.AcademicYear,
      program: Student.program,
    };

    const examResults = Student?.examResults;
    const currentResult = examResults[examResults.length - 1];
    const IsPublished = currentResult.IsPublished;

    return Second(
      res,
      [
        "Done  This your profile",
        { StudentProfile, currentResult: IsPublished ? currentResult : [] },
      ],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

//Update Student profile
const UpdateStudentProfile = async (req, res, next) => {
  try {
    const { email, Name, password } = req.body;
    if (email) {
      const EmailFound = await studentModel.findOne({ email });
      if (EmailFound) {
        return First(res, "This email is already taken.", 400, http.FAIL);
      }
    }

    const UpdateFields = {
      Name,
      email,
    };

    if (password) {
      const hashPassword = bcrypt.hashSync(password, 5);
      UpdateFields.password = hashPassword;
    }
    const updateProfile = await studentModel.findByIdAndUpdate(
      req.user._id,
      UpdateFields,
      { new: true }
    );

    return Second(
      res,
      [" Done  AdminProfile Updated ", { updateProfile }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

//Update Student Data by Admin
const UpdateStudentData = async (req, res, next) => {
  try {
    const {
      subjects,
      AcademicYear,
      program,
      classLevels,
      IsSuspended,
      Iswitdrawn,
    } = req.body;
    const Email = await studentModel.findById(req.params.id);
    if (!Email) {
      return First(res, "not found student", 404, http.FAIL);
    }

    const updateProfile = await studentModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          subjects,
          AcademicYear,
          program,
          IsSuspended,
          Iswitdrawn,
        },
        $addToSet: {
          classLevels,
        },
      },
      { new: true }
    );
    return Second(
      res,
      [" student data is  Updated successfully ", { updateProfile }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const promotingStudent = async (req, res, next) => {
  try {
    const StudentFound = await studentModel.findById(req.params.id);
    if (!StudentFound) {
      return First(res, "studen not found", 404, http.FAIL);
    }
    const ExamFound = await ExamResultModel.findOne({
      studentId: req.params.id,
    }).populate("AcademictermId");

    if (!ExamFound) {
      return First(res, "not fount Result for this student", 404, http.FAIL);
    }
    console.log(ExamFound);
    // Promoting student
    if (ExamFound.status === "passed") {
      switch (StudentFound.currentClassLevel) {
        case "level 100":
          StudentFound.classLevels.push("level 200");
          StudentFound.currentClassLevel = "level 200";
          break;
        case "level 200":
          StudentFound.classLevels.push("level 300");
          StudentFound.currentClassLevel = "level 300";
          break;
        case "level 300":
          StudentFound.classLevels.push("level 400");
          StudentFound.currentClassLevel = "level 400";
          break;
        case "level 400":
          StudentFound.YearGraduatd = new Date();
          StudentFound.isGraduated = true;
          break;
      }
      StudentFound.save();

      return Second(
        res,
        ["student promoting", { StudentFound }],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const activeAccount = async (req, res) => {
  try {
    // receving the token from the params
    const { token } = req.params;
    // decoding the token to get the payload
    const payLoad = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Searching for the user in DataBase
    const isStudent = await studentModel.findOneAndUpdate(
      { email: payLoad.email },
      { confirmEmail: true },
      { new: true }
    );
    if (!isStudent) {
      return First(res, "Student not found.", 404, http.FAIL);
    }

    Second(
      res,
      ["Account Activated , Try to login ", isStudent],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const Refreshtoken = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    // Define userCollection
    const userCollection = selectModel(role);
    if (!userCollection) {
      return First(
        res,
        "Invalid role or user collection not found",
        404,
        http.FAIL
      );
    }

    const userFound = await userCollection.findOne({ email });
    if (!userFound) {
      return First(res, "User Not Found", 404, http.FAIL);
    }
    console.log(userFound);

    if (userFound.confirmEmail) {
      return First(res, "You are already confirmed", 400, http.FAIL);
    }

    const newToken = jwt.sign(
      { id: userFound._id, role: userFound.role, email: userFound.email },
      process.env.JWT_SECRET_KEY
    );

    const html = signUpTemplate(
      `http://localhost:3000/api/Teacher/activate_account/${newToken}`
    );
    const messageSent = await sendEmail({
      to: userFound.email,
      subject: "Account Activation",
      html,
    });

    if (!messageSent) {
      return First(res, "Failed to send activation email", 400, http.FAIL);
    }
    return Second(
      res,
      ["Your new token", { token: newToken }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  UpdateStudentProfile,
  UpdateStudentData,
  GetStudent,
  GetStudentProfile,
  GetStudentById,
  promotingStudent,
  activeAccount,
  Refreshtoken,
};
