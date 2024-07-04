const AcademictermModel = require("../../../Database/model/Academic/academicTerm.model.js");
const AdminModel = require("../../../Database/model/staff/Admin.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const CraeteAcademicTerm = async (req, res, next) => {
  try {
    req.body.Createdby = req.user._id;
    const ExistTerm = await AcademictermModel.findOne({ Name: req.body.Name });
    if (ExistTerm) {
      return First(res, "this Term Aready Exist", 404, http.FAIL);
    }

    const term = await AcademictermModel.create(req.body);

    if (term) {
      const Admin = await AdminModel.findByIdAndUpdate(req.user._id);
      Admin.Academicterm.push(term._id);
      Admin.save();
    }

    return Second(res, ["Academic Term Add", { term }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetAcademicTerms = async (req, res, next) => {
  try {
    const CheckTerm = await AcademictermModel.find({});
    if (!CheckTerm) {
      return First(res, "not found Acdemic Term", 404, http.FAIL);
    }
    return Second(
      res,
      ["This is Acdemic Term", { CheckTerm }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetSingleAcademicTerm = async (req, res, next) => {
  try {
    const Term = await AcademictermModel.findById(req.params.id);
    if (!Term) {
      return First(
        res,
        `not found Acdemic Term by id: ${req.params.id}`,
        404,
        http.FAIL
      );
    }
    return Second(res, ["This is Acdemic Term", { Term }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const UpdateAcademicterm = async (req, res, next) => {
  try {
    const { Name, fromYear, ToYear } = req.body;
    req.body.UpdatedBy = req.user._id;
    const Checkexist = await AcademictermModel.findOne({ Name });

    if (Checkexist) {
      console.log(Checkexist);
      return First(
        res,
        `Name of  Acdemicterm by id: ${req.params.id} is aready exist`,
        404,
        http.FAIL
      );
    } else {
      const CheckTerm = await AcademictermModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      return Second(
        res,
        [
          `Acdemic Term by id: ${req.params.id} Updated Succssfly`,
          { CheckTerm },
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

const DeleteAcademicTerm = async (req, res, next) => {
  try {
    const CheckAcademicTerm = await AcademictermModel.findByIdAndDelete(
      req.params.id
    );
    if (!CheckAcademicTerm) {
      return First(res, "not found Acdemic Term", 404, http.FAIL);
    }

    return Second(
      res,
      [
        `Acdemic term by id: ${req.params.id} Deleted Succssfly`,
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
  CraeteAcademicTerm,
  GetAcademicTerms,
  GetSingleAcademicTerm,
  UpdateAcademicterm,
  DeleteAcademicTerm,
};
