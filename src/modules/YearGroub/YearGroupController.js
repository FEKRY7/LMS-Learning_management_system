const YearGroupModel = require("../../../Database/model/Academic/YearGroup.model");
const AcademicYearModel = require("../../../Database/model/Academic/academicYear.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const CraeteYearGroup = async (req, res, next) => {
  try {
    req.body.Createdby = req.user._id;

    const existYear = await AcademicYearModel.findById(req.params.id);
    if (!existYear) {
      return First(res, "This Year Not Exists", 400, http.FAIL);
    }

    req.body.AcademicYaer = req.params.id;

    const YearGroupFound = await YearGroupModel.findOne({
      Name: req.body.Name,
    });
    if (YearGroupFound) {
      return First(res, "YearGroup aready exist", 400, http.FAIL);
    }

    const CraetedYearGroup = await YearGroupModel.create(req.body);

    return Second(
      res,
      ["YearGroup Craeted successfully", { CraetedYearGroup }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetYearGroup = async (req, res, next) => {
  try {
    const CheckYearGroup = await YearGroupModel.find({});
    if (!CheckYearGroup) {
      return First(res, "not found  YearGroup", 404, http.FAIL);
    }
    return Second(
      res,
      ["This is  YearGroup", { CheckYearGroup }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetSingleYearGroup = async (req, res, next) => {
  try {
    const YearGroup = await YearGroupModel.findById(req.params.id);
    if (!YearGroup) {
      return First(
        res,
        `not found YearGroup by id: ${req.params.id}`,
        404,
        http.FAIL
      );
    }
    return Second(res, ["This is YearGroup", { YearGroup }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const UpdateYearGroup = async (req, res, next) => {
  try {
    req.body.UpdatedBy = req.user._id;
    const Checkexist = await YearGroupModel.findOne({ _id: req.params.id });
    console.log(Checkexist);

    if (!Checkexist) {
      return First(
        res,
        `YearGroup by id: ${req.params.id} not found`,
        404,
        http.FAIL
      );
    }
    const updatedYearGroup = await YearGroupModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return Second(
      res,
      [
        `YearGroup with id: ${req.params.id} Updated Succssfully`,
        { updatedYearGroup },
      ],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const DeleteYearGroup = async (req, res, next) => {
  try {
    const CheckYearGroup = await YearGroupModel.findByIdAndDelete(
      req.params.id
    );
    if (!CheckYearGroup) {
      return First(res, "This Year Not Exists", 400, http.FAIL);
    }

    return Second(
      res,
      [
        `YearGroup by id: ${req.params.id} Deleted Successfully`,
        { CheckYearGroup },
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
  CraeteYearGroup,
  GetYearGroup,
  GetSingleYearGroup,
  UpdateYearGroup,
  DeleteYearGroup,
};
