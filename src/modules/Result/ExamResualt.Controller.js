const studentModel = require("../../../Database/model/Academic/StudentModel.model.js");
const ExamResultModel = require("../../../Database/model/Academic/ExamResualt.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const CheckExamResult = async (req, res, next) => {
  try {
    const StudentFound = await studentModel.findById(req.user._id);
    if (!StudentFound) {
      return First(res, "Student not Registered", 404, http.FAIL);
    }

    const examResult = await ExamResultModel.findOne({
      studentId: req.user._id,
      ExamId: req.params.examId,
    }).populate({
      path: "ExamId",
      populate: {
        path: "Questions",
        select: "Question",
      },
    });
    if (!examResult) {
      return First(res, "examResult not found", 404, http.FAIL);
    }
    if (!examResult.IsPublished) {
      return First(
        res,
        "examResult not published yet ,back later",
        400,
        http.FAIL
      );
    }
    return Second(res, ["Done your Result", { examResult }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

// Admin obscure Results
const PublishedExamResult = async (req, res, next) => {
  try {
    const examResult = await ExamResultModel.findById(req.params.id);
    if (!examResult) {
      return First(res, "result not found", 404, http.FAIL);
    } else {
      const obscure = await ExamResultModel.findByIdAndUpdate(
        req.params.id,
        { IsPublished: req.body.IsPublished },
        { new: true }
      );
      return Second(res, ["Done your Result", { obscure }], 200, http.SUCCESS);
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  CheckExamResult,
  PublishedExamResult,
};
