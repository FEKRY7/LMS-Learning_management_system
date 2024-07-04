const mongoose = require("mongoose");

const { Types } = require("mongoose");

const ExamResultSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["fialed", "passed"],
      default: "failed",
    },
    remark: {
      type: String,
      required: true,
      enum: ["good", "Very good", "poor", "Excellent", "fair"],
      default: "poor",
    },

    score: {
      type: Number,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    passMark: {
      type: Number,
      required: true,
      default: 50,
    },
    IsPublished: {
      type: Boolean,
      default: false,
    },

    studentId: {
      type: Types.ObjectId,
      ref: "student",
    },
    answerQesutions: [
      {
        type: Object,
      },
    ],  
    ExamId: {
      type: Types.ObjectId,
      ref: "Exam",
    },

    AcademicYearId: {
      type: Types.ObjectId,
      ref: "AcademicYear",
    },
    AcademictermId: {
      type: Types.ObjectId,
      ref: "Academicterm",
    },
    classLevelId: {
      type: Types.ObjectId,
      ref: "classLevel",
    },
  },
  {
    timestamps: true,
  }
);

const ExamResultModel = mongoose.model("ExamResult", ExamResultSchema);
module.exports = ExamResultModel;
