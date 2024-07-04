const AcademicYearModel = require("../../../Database/model/Academic/academicYear.model.js");
const AdminModel = require("../../../Database/model/staff/Admin.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const CraeteAcademicYear = async (req, res, next) => {
  try {
    const existYear = await AcademicYearModel.findOne({ Name: req.body.Name });
    if (existYear) {
      return First(res, "This Year Already Exists", 400, http.FAIL);
    }

    req.body.Createdby = req.user._id;

    const newYear = await AcademicYearModel.create(req.body);

    if (newYear) {
      const admin = await AdminModel.findById(req.user._id);
      admin.AcademicYear.push(newYear._id);
      await admin.save(); // Ensure the save operation is awaited
    }

    return Second(res, ["Academic Year Added", { newYear }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetAcademicYears = async (req, res, next) => {
  try {
    const CheckYears = await AcademicYearModel.find({});
    if (!CheckYears) {
      return First(res, "not found Acdemic Years", 404, http.FAIL);
    } else {
      return Second(
        res,
        ["This is Acdemic Years", { CheckYears }],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetSingleAcademicYear = async (req, res, next) => {
  try {
    const CheckYear = await AcademicYearModel.findById(req.params.id);
    if (!CheckYear) {
      return First(
        res,
        `not found Acdemic Year by id: ${req.params.id}`,
        404,
        http.FAIL
      );
    } else {
      return Second(
        res,
        ["This is Acdemic Year", { CheckYear }],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const UpdateAcademicYear = async (req, res, next) => {
  try {
    req.body.UpdatedBy = req.user._id;
    const Checkexist = await AcademicYearModel.findOne({ Name: req.body.Name });

    if (Checkexist) {
      console.log(Checkexist);
      return First(
        res,
        `Name of AcdemicYear by id: ${req.params.id} is aready exist`,
        404,
        http.FAIL
      );
    } else {
      const Checkexist = await AcademicYearModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return Second(
        res,
        [
          `Acdemic Year by id: ${req.params.id} Updated Succssfly`,
          { Checkexist },
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

const DeleteAcademicYear = async (req, res, next) => {
  try {
    const CheckAcademicYear = await AcademicYearModel.findByIdAndDelete(
      req.params.id
    );
    if (!CheckAcademicYear) {
      return First(res, `not found Acdemic Years`, 404, http.FAIL);
    }

    return Second(
      res,
      [
        `Acdemic Year by id: ${req.params.id} Deleted Succssfly`,
        { CheckAcademicYear },
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
  CraeteAcademicYear,
  GetAcademicYears,
  GetSingleAcademicYear,
  UpdateAcademicYear,
  DeleteAcademicYear,
};
