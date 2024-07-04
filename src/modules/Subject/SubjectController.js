const programModel = require("../../../Database/model/Academic/program.model.js");
const subjectModel = require("../../../Database/model/Academic/subject.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const Craetesubject = async (req, res, next) => {
  try {
    const { Name } = req.body;
    req.body.Createdby = req.user._id;

    const checkprogram = await programModel.findById(req.params.id);
    if (!checkprogram) {
      return First(res, "not found program", 404, http.FAIL);
    } else {
      const subject = await subjectModel.findOne({ Name });

      if (subject) {
        return First(res, "subject aready exist ", 400, http.FAIL);
      } else {
        req.body.programId = req.params.id;

        const CraetedSubject = await subjectModel.create(req.body);
        return Second(
          res,
          ["Subject Craeted successfully", { CraetedSubject }],
          200,
          http.SUCCESS
        );
      }
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const Getsubjecs = async (req, res, next) => {
  try {
    const Checksubject = await subjectModel.find({});
    if (!Checksubject) {
      return First(res, "not found  subject", 404, http.FAIL);
    }
    return Second(
      res,
      ["This is subject", { Checksubject }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetSinglesubject = async (req, res, next) => {
  try {
    const subject = await subjectModel.findById(req.params.id);
    if (!subject) {
      return First(
        res,
        `not found subject by id: ${req.params.id}`,
        404,
        http.FAIL
      );
    }
    return Second(res, ["This is subject", { subject }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const Updatesubject = async (req, res, next) => {
  try {
    req.body.UpdatedBy = req.user._id;
    const Checkexist = await subjectModel.findOne({ _id: req.params.id });
    console.log(Checkexist);

    if (!Checkexist) {
      return First(
        res,
        `subject by id: ${req.params.id} not found`,
        404,
        http.FAIL
      );
    } else {
      const updatedsubject = await subjectModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      return Second(
        res,
        [
          `subject with id: ${req.params.id} Updated Succssfully`,
          { updatedsubject },
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

const Deletesubject = async (req, res, next) => {
  try {
    const Checksubject = await subjectModel.findByIdAndDelete(req.params.id);
    if (!Checksubject) {
      return First(res, `subject not found`, 404, http.FAIL);
    }
    return Second(
      res,
      [
        `subject by id: ${req.params.id} Deleted Successfully`,
        { Checksubject },
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
  Craetesubject,
  Getsubjecs,
  GetSinglesubject,
  Updatesubject,
  Deletesubject,
};
