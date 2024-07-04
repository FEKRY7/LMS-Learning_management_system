const TeacherModel = require("../../../Database/model/staff/teacherModel.model.js");
const studentModel = require("../../../Database/model/Academic/StudentModel.model.js");
const ExamResultModel = require("../../../Database/model/Academic/ExamResualt.model.js");
const ExamModel = require("../../../Database/model/Academic/Exams.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const CraetExam = async (req, res, next) => {
  try {
    const { Name } = req.body;
    // check Teacher found
    const Teacher = await TeacherModel.findById(req.user._id);
    if (!Teacher) {
      return First(res, "Teacher not found", 404, http.FAIL);
    } else {
      const Exam = await ExamModel.findOne({ Name });
      if (Exam) {
        return First(res, "Exam aready exist", 400, http.FAIL);
      } else {
        req.body.Createdby = req.user._id;
        const NewExam = await ExamModel.create(req.body);
        Teacher.exams.push(NewExam);
        Teacher.save();

        return Second(
          res,
          ["Academic Term Add", { NewExam }],
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

const GetExams = async (req, res, next) => {
  try {
    const Exams = await ExamModel.find({})
      .populate({
        path: "Questions",
        select: "-correctAnswer -Incorrect -updatedAt -createdAt",
        populate: {
          path: "CreatedBy",
          select: "Name",
        },
      })
      .select(" Name duration Questions ");
    if (!Exams) {
      return First(res, "not found Exams", 404, http.FAIL);
    }
    return Second(res, ["This is Exams", { Exams }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetExamById = async (req, res, next) => {
  try {
    const Exam = await ExamModel.findById(req.params.id);
    if (!Exam) {
      return First(
        res,
        `not found Exam  with id: ${req.params.id}`,
        404,
        http.FAIL
      );
    }
    return Second(res, ["This is Exam", { Exam }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const UpdateExam = async (req, res, next) => {
  try {
    const Exam = await ExamModel.findById(req.params.id);
    if (!Exam) {
      return First(
        res,
        `not found Exam  with id: ${req.params.id}`,
        404,
        http.FAIL
      );
    } else {
      const UpdateExam = await ExamModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return Second(res, [" Exam Updated ", { UpdateExam }], 200, http.SUCCESS);
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const WriteExam = async (req, res, next) => {
  try {
    //  student found
    const StudentFound = await studentModel.findById(req.user._id);
    if (!StudentFound) {
      return First(res, "studen not found", 404, http.FAIL);
    }
    if (StudentFound.IsSuspended || StudentFound.Iswitdrawn) {
      return First(
        res,
        "You can not take this exam you are IsSuspended  or Iswitdrawn",
        404,
        http.FAIL
      );
    }

    // Exam found
    const ExamFound = await ExamModel.findById(req.params.id)
      .populate("Questions")
      .populate("academicTermId");
    console.log(ExamFound);

    if (!ExamFound) {
      return First(res, "exam not found", 404, http.FAIL);
    }

    const questions = ExamFound.Questions;
    console.log(ExamFound);
    //check if student take the examExamResultModel

    const examResualt = await ExamResultModel.findOne({
      studentId: StudentFound._id,
      ExamId: ExamFound._id,
    });
    if (examResualt) {
      return First(res, "You have aready tack this exam", 400, http.FAIL);
    }

    //check if student answer All Questios
    const StudentAnswer = req.body.Answers;
    if (questions.length != StudentAnswer.length) {
      return First(res, "you have answer all questions", 400, http.FAIL);
    }
    let correctAnswer = 0;
    let WrongAnswer = 0;
    let score = 0;
    let AnsweredQuestions = 0;
    let grade = 0;
    let TotalQuestion = 0;
    let status = "";
    let remark = "";

    // check  exam Answers
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (question.correctAnswer === StudentAnswer[i]) {
        correctAnswer++;
        score++;
        question.Incorrect = true;
      } else {
        WrongAnswer++;
      }
    }
    /// Exam Report
    TotalQuestion = questions.length;
    grade = (correctAnswer / TotalQuestion) * 100;
    AnsweredQuestions = questions.map((question) => {
      return {
        question: question.question,
        correctAnswer: question.correctAnswer,
        Incorrect: question.Incorrect,
      };
    });

    // student status
    if (grade >= 50) {
      status = "passed";
    } else {
      status = "failed";
    }

    // remark
    if (grade >= 80) {
      remark = "Excellent";
    } else if (grade >= 70) {
      remark = "Very good";
    } else if (grade >= 60) {
      remark = "good";
    } else if (grade >= 50) {
      remark = "fair";
    } else {
      remark = "poor";
    }

    // assgin resualt
    const finalResualt = await ExamResultModel.create({
      ExamId: ExamFound._id,
      studentId: StudentFound._id,
      classLevelId: ExamFound.classLevel,
      AcademictermId: ExamFound.academicTermId,
      AcademicYearId: ExamFound.AcademicYearId,
      grade,
      score,
      remark,
      status,
      answerQesutions: AnsweredQuestions,
    });
    // push resualt to student
    StudentFound.examResults.push(finalResualt);
    await StudentFound.save();

    return Second(
      res,
      ["you are Submit  come back for check  resualt later", { finalResualt }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const DeleteExam = async (req, res, next) => {
  try {
    const Exam = await ExamModel.findById(req.params.id);
    if (!Exam) {
      return First(
        res,
        `not found Exam  with id: ${req.params.id}`,
        404,
        http.FAIL
      );
    } else {
      const UpdateExam = await ExamModel.findByIdAndDelete(req.params.id, {
        new: true,
      });
      return Second(
        res,
        [" Exam Deleted successfully ", { UpdateExam }],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  CraetExam,
  GetExams,
  GetExamById,
  UpdateExam,
  WriteExam,
  DeleteExam,
};
