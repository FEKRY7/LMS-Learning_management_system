const QuestionModel = require("../../../Database/model/Academic/Question.model.js");
const ExamModel = require("../../../Database/model/Academic/Exams.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const CraeteQuestion = async (req, res, next) => {
  try {
    const { Question, optionA, optionB, optionC, optionD, correctAnswer } =
      req.body;
    //find exam
    const ExamFound = await ExamModel.findById(req.params.id);
    if (!ExamFound) {
      return First(res, "exam Not found", 404, http.FAIL);
    } else {
      const QuestionFound = await QuestionModel.findOne({ Question });
      if (QuestionFound) {
        return First(res, "Question is aready Exist", 400, http.FAIL);
      } else {
        // Create Question
        const CreateQuestion = await QuestionModel.create({
          Question,
          optionA,
          optionB,
          optionC,
          optionD,
          correctAnswer,
          CreatedBy: req.user._id,
        });
        //Push question to exam
        ExamFound.Questions.push(CreateQuestion);
        ExamFound.save();

        return Second(
          res,
          ["QuestionCreated Successfully", { CreateQuestion }],
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

const GetQuestions = async (req, res, next) => {
  try {
    const CheckQuestion = await QuestionModel.find({});
    if (!CheckQuestion) {
      return First(res, "not found  Question", 404, http.FAIL);
    }
    return Second(
      res,
      ["This is  Question", { CheckQuestion }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetSingleQuestion = async (req, res, next) => {
  try {
    const Question = await QuestionModel.findById(req.params.id);
    if (!Question) {
      return First(
        res,
        `not found Question by id: ${req.params.id}`,
        404,
        http.FAIL
      );
    }
    return Second(
      res,
      ["Question feched succssefully", { Question }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const UpdateQuestion = async (req, res, next) => {
  try {
    req.body.UpdatedBy = req.user._id;
    const Checkexist = await QuestionModel.findOne({ _id: req.params.id });

    if (!Checkexist) {
      return First(
        res,
        ` Question by id: ${req.params.id} not found`,
        404,
        http.FAIL
      );
    } else {
      const updatedQuestion = await QuestionModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      return Second(
        res,
        [
          `Question with id: ${req.params.id} Updated Succssfully`,
          { updatedQuestion },
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

const DeleteQuestion = async (req, res, next) => {
  try {
    const CheckQuestion = await QuestionModel.findByIdAndDelete(req.params.id);
    if (!CheckQuestion) {
      return First(res, "not found  Question", 404, http.FAIL);
    }
    return Second(
      res,
      [
        `Question by id: ${req.params.id} Deleted Successfully`,
        { CheckQuestion },
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
  CraeteQuestion,
  GetQuestions,
  GetSingleQuestion,
  UpdateQuestion,
  DeleteQuestion,
};
