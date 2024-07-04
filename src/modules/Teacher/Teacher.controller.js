const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { paginate } = require("../../middleware/pagination.js");
const TeacherModel = require("../../../Database/model/staff/teacherModel.model.js");
const sendEmail = require("../../utils/sendEmail.js");
const signUpTemplate = require("../../utils/htmlTemplets.js");
const { selectModel } = require("../../middleware/authoriztion.middelware.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

//  Get Teachers
const GetTeacher = async (req, res, next) => {
  try {
    const { page, size } = req.query;
    const { skip, limit } = paginate(page, size);
    // Calculate total documents
    const totalDocu = await TeacherModel.countDocuments();
    const Teachers = await TeacherModel.find({})
      .select("Name email role")
      .skip(skip)
      .limit(limit);
    if (!Teachers) {
      return First(res, "not found any Teachers not found", 404, http.FAIL);
    }
    return Second(
      res,
      ["Done this is Teachers List", { Teachers, totalDocu }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

//  Get Teacher BY_ID
const GetTeacherById = async (req, res, next) => {
  try {
    const Teacher = await TeacherModel.findById(req.params.id).select(
      "Name email role"
    );
    if (!Teacher) {
      return First(res, "Teacher not found", 404, http.FAIL);
    }
    return Second(
      res,
      ["Done this is teacher", { Teacher }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

//  Get Teacher profile
const GetTeacherProfile = async (req, res, next) => {
  try {
    const Teacher = await TeacherModel.findById(req.user._id).select(
      "Name email role"
    );
    console.log(Teacher);
    if (!Teacher) {
      return First(res, "Teacher not found", 404, http.FAIL);
    }
    return Second(
      res,
      ["Done this is teacher", { Teacher }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// Admin assigning Roles TO Teacher
const assigningTeacherRole = async (req, res, next) => {
  try {
    const { AcademicYear, Academicterm, program, classLevel } = req.body;
    const Teacher = await TeacherModel.findById(req.params.id);

    if (!Teacher) {
      return First(res, "Teacher not found", 404, http.FAIL);
    }

    if (Teacher.Iswitdrawn || Teacher.IsSuspended) {
      return First(res, "Teacher is withdrawn or suspended", 400, http.FAIL);
    }

    let updated = false;

    if (program) {
      Teacher.program = program;
      updated = true;
    }

    if (Academicterm) {
      Teacher.Academicterm = Academicterm;
      updated = true;
    }

    if (AcademicYear) {
      Teacher.AcademicYear = AcademicYear;
      updated = true;
    }

    if (classLevel) {
      Teacher.classLevel = classLevel;
      updated = true;
    }

    if (updated) {
      await Teacher.save();
      return Second(
        res,
        ["Teacher information updated successfully"],
        200,
        http.SUCCESS
      );
    } else {
      return Second(res, ["No updates provided"], 200, http.SUCCESS);
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

//  Update Teacher profile
const UpdateTeacherProfile = async (req, res, next) => {
  try {
    const { email, Name, password } = req.body;

    const teacher = await TeacherModel.findById(req.user._id);
    if (!teacher) {
      return First(res, "Not Found Teacher", 404, http.FAIL);
    }
    const UpdateFields = {
      Name,
      email,
    };

    if (password) {
      const hashPassword = await bcrypt.hashSync(password, 5);
      UpdateFields.password = hashPassword;
    }
    const updateProfile = await TeacherModel.findByIdAndUpdate(
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

const activeAccount = async (req, res) => {
  try {
    // receving the token from the params
    const { token } = req.params;
    // decoding the token to get the payload
    const payLoad = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Searching for the user in DataBase
    const isTeacher = await TeacherModel.findOneAndUpdate(
      { email: payLoad.email },
      { confirmEmail: true },
      { new: true }
    );
    if (!isTeacher) {
      return First(res, "Teacher not found.", 404, http.FAIL);
    }

    Second(
      res,
      ["Account Activated , Try to login ", isTeacher],
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
        400,
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
  GetTeacher,
  GetTeacherById,
  GetTeacherProfile,
  assigningTeacherRole,
  UpdateTeacherProfile,
  activeAccount,
  Refreshtoken,
};
