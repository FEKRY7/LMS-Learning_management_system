const jwt = require("jsonwebtoken");
const AdminModel = require("../../Database/model/staff/Admin.model.js");
const TeacherModel = require("../../Database/model/staff/teacherModel.model.js");
const StudentModel = require("../../Database/model/Academic/StudentModel.model.js"); // Changed studentModel to StudentModel for consistency
const tokenModel = require('../../Database/model/staff/tokenModel.js') 
const http = require("../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../utils/httperespons.js");

const isAuthenticated = async (req, res, next) => {
  // Checking token existence
  const token = req.headers.token;

  if (!token) {
    return First(res, "Token is required", 400, http.FAIL);
  }

  // checking token vlaidation
  const tokenDb=await tokenModel.findOne({token , isValied:true })
  if (!tokenDb) {
      return First(res,"expired Token",400,http.FAIL)
  }

  try {
    // Checking user validation
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user =
      (await AdminModel.findById(payload.id)) ||
      (await TeacherModel.findById(payload.id)) ||
      (await StudentModel.findById(payload.id));
    
    if (!user) {
      return First(res, "User not found", 400, http.FAIL);
    }

    req.user = user;
    next();
  } catch (err) {
    return First(res, "Invalid token", 401, http.FAIL);
  }
};

module.exports = isAuthenticated;
