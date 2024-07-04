const jwt = require("jsonwebtoken");
const tokenModel = require("../../../Database/model/staff/tokenModel.js");
const AdminModel = require("../../../Database/model/staff/Admin.model.js");
const bcrypt = require("bcrypt");
const sendEmail = require("../../utils/sendEmail.js");
const signUpTemplate = require("../../utils/htmlTemplets.js");
const { selectModel } = require("../../middleware/authoriztion.middelware.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

// Admin register
const Adminregister = async (req, res) => {
  try {
    // making sure that the used email dosent exist
    const isUser = await AdminModel.findOne({ email: req.body.email });
    if (isUser) {
      return First(res, "User already existed", 409, http.FAIL);
    }

    // Creating the token
    const token = jwt.sign(
      { email: req.body.email, id: req.body._id, role: req.body.role },
      process.env.JWT_SECRET_KEY
    );
    // Creating the user
    const user = await AdminModel.create(req.body);
    const html = signUpTemplate(
      `http://localhost:3000/api/auth/activat_account/${token}`
    );
    const messageSent = await sendEmail({
      to: user.email,
      subject: "Account Activation",
      html,
    });
    if (!messageSent) {
      return First(res, "Failed to send activation email.", 400, http.FAIL);
    }
    Second(
      res,
      ["User Created , Pleasr activate your account", token],
      201,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// User register (Student and Teacher)
const UserRegister = async (req, res, next) => {
  try {
    const { Name, email, password, role } = req.body;
    //define userCollection
    const userCollection = selectModel(role);
    console.log(userCollection);
    const AdminFound = await AdminModel.findById(req.user._id);
    if (!AdminFound) {
      return First(res, "Admin Not found", 404, http.FAIL);
    }
    const User = await userCollection.findOne({ email });

    if (User) {
      return First(res, "user aready exist", 400, http.FAIL);
    } else {
      const newuser = new userCollection({ Name, email, password });

      const token = await jwt.sign(
        { email: newuser.email, id: newuser._id, role: newuser.role },
        process.env.JWT_SECRET_KEY
      );

      const html = signUpTemplate(
        `http://localhost:3000/api/auth/activat_account/${token}`
      );
      const messageSent = await sendEmail({
        to: newuser.email,
        subject: "Account Activation",
        html,
      });
      if (!messageSent) {
        return First(res, "Failed to send activation email.", 400, http.FAIL);
      }

      const savedUser = await newuser.save();
      if (savedUser.role === "Teacher") {
        AdminFound.Teachers.push(savedUser);
        AdminFound.save();
      }
      if (savedUser.role === "student") {
        AdminFound.Studens.push(savedUser);
        AdminFound.save();
      }
      return Second(
        res,
        ["Done", { userId: savedUser._id }],
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
    const isAdmin = await AdminModel.findOneAndUpdate(
      { email: payLoad.email },
      { confirmEmail: true },
      { new: true }
    );
    if (!isAdmin) {
      return First(res, "Admin not found.", 404, http.FAIL);
    }

    Second(
      res,
      ["Account Activated , Try to login ", isAdmin],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

//User login
const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // define userCollection
    const userCollection = selectModel(role);

    const userFound = await userCollection.findOne({ email });
    if (!userFound) {
      return First(res, "User Not Found", 404, http.FAIL);
    }
    if (!userFound.confirmEmail) {
      return First(res, "confirm you email frist", 404, http.FAIL);
    }
    const checkPassword = await bcrypt.compareSync(
      password,
      userFound.password
    );
    if (!checkPassword) {
      return First(res, "invalid login credential", 404, http.FAIL);
    } else {
      const token = await jwt.sign(
        { Name: userFound.Name, id: userFound._id, email, isLoggedIn: true },
        process.env.JWT_SECRET_KEY
      );
      await tokenModel.create({ token, user: userFound._id });

      return Second(
        res,
        ["login success", { loginToken: token }],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const UpgradeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newRole } = req.body;

    const user = await AdminModel.findById(userId);
    if (!user) {
      return First(res, "User not found", 404, http.FAIL);
    }

    if (
      newRole &&
      ["student", "admin", "instructor"].includes(newRole) &&
      user.role !== newRole
    ) {
      user.role = newRole;
      await user.save();

      return Second(
        res,
        ["User role upgraded successfully", { user: user.role }],
        200,
        http.SUCCESS
      );
    } else {
      return First(
        res,
        "Invalid new role or same as current role",
        400,
        http.FAIL
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetAllStududents = async (req, res) => {
  try {
    const Students = await AdminModel.find({ role: "student" }).select(
      "-password -updatedAt -createdAt -confirmEmail "
    );
    if (!Students) {
      return First(res, "Not Found Any Users", 404, http.FAIL);
    }

    return Second(
      res,
      ["Student Data", { StudentData: Students }],
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
      `http://localhost:3000/api/auth/activate_account/${newToken}`
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
  Adminregister,
  activeAccount,
  UpgradeUserRole,
  GetAllStududents,
  UserRegister,
  login,
  Refreshtoken,
};
