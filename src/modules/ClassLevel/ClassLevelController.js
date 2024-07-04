const classLevelModel = require("../../../Database/model/Academic/classLevel.model.js");
const AdminModel = require("../../../Database/model/staff/Admin.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

// create new ClassLevel
const CraeteClassLevel = async (req, res, next) => {
  try {
    const { Name } = req.body;
    req.body.Createdby = req.user._id;
    const ExistClassLevel = await classLevelModel.findOne({ Name });
    if (ExistClassLevel) {
      return First(res, "this ClassLevel Aready Exist", 404, http.FAIL);
    }

    const ClassLevel = await classLevelModel.create(req.body);

    if (ClassLevel) {
      const Admin = await AdminModel.findByIdAndUpdate(req.user._id);
      Admin.classLevel.push(ClassLevel._id);
      Admin.save();
    }

    return Second(res, ["ClassLevel Added", { ClassLevel }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// Get ClassLevels
const GetAcademicClassLevels = async (req, res, next) => {
  try {
    const CheckClassLevel = await classLevelModel.find({});
    if (!CheckClassLevel) {
      return First(res, "not found ClassLevel", 404, http.FAIL);
    }
    return Second(
      res,
      ["This is ClassLevel", { CheckClassLevel }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// get spacefic ClassLevel
const GetSingleAcademicClassLevel = async (req, res, next) => {
  try {
    const ClassLevel = await classLevelModel.findById(req.params.id);
    if (!ClassLevel) {
      return First(
        res,
        `not found ClassLevel by id: ${req.params.id}`,
        404,
        http.FAIL
      );
    }
    return Second(
      res,
      ["This is ClassLevel", { ClassLevel }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// Update ClassLevel
const UpdateAcademicClassLevel = async (req, res, next) => {
  try {
    req.body.UpdatedBy = req.user._id;
    const Checkexist = await classLevelModel.findOne({ Name: req.body.Name });

    if (Checkexist) {
      return First(
        res,
        `Name of  classLevel by id: ${req.params.id} is aready exist`,
        404,
        http.FAIL
      );
    } else {
      const CheckLevel = await classLevelModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!CheckLevel) {
        return First(
          res,
          `classLevel with id: ${req.params.id} not found`,
          400,
          http.FAIL
        );
      }
      return Second(
        res,
        [
          `classLevel  by id: ${req.params.id} Updated Succssfly`,
          { CheckLevel },
        ],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// Delete ClassLevel
const DeleteAcademicTerm = async (req, res, next) => {
  try {
    const CheckAcademicTerm = await classLevelModel.findByIdAndDelete(
      req.params.id
    );

    if (!CheckAcademicTerm) {
      return First(res, "not found ClassLevel", 404, http.FAIL);
    }

    return Second(
      res,
      [
        `ClassLevel with id: ${req.params.id} Deleted Successfully`,
        { CheckAcademicTerm },
      ],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  CraeteClassLevel,
  GetAcademicClassLevels,
  GetSingleAcademicClassLevel,
  UpdateAcademicClassLevel,
  DeleteAcademicTerm,
};
