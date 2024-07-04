const AdminModel = require("../../../Database/model/staff/Admin.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

// Admin GetAdmin profile
const AdminProfile = async (req, res, next) => {
  try {
    const Admin = await AdminModel.findById(req.user._id)
      .select("Name email role")
      .populate("AcademicYear");
    if (!Admin) {
      return First(res, "Admin not found", 404, http.FAIL);
    } else {
      return Second(
        res,
        ["Done this is Admin Profile", { Admin }],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// Admin Get all Admins
const AdminsList = async (req, res, next) => {
  try {
    const Admins = await AdminModel.find({});
    if (!Admins) {
      return First(res, "Admins not found", 404, http.FAIL);
    } else {
      return Second(
        res,
        ["Done this is Admins list", { Admins }],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const UpdateAdminProfile = async (req, res, next) => {
  try {
    const { email, Name } = req.body;

    const checkEmail = await AdminModel.findOne({ email });
    if (checkEmail) {
      return First(res, "this email is taken/exist", 404, http.FAIL);
    }

    const updateProfile = await AdminModel.findOneAndUpdate(
      req.user._id,
      { email, Name },
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

module.exports = {
  UpdateAdminProfile,
  AdminsList,
  AdminProfile,
};
