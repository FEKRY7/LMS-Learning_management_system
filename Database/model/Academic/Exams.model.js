const mongoose = require("mongoose");

const { Types } = require("mongoose");

const ExamSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    description: {
      type: String,
      required: [true, "userName is required"],
    },
    duration: {
      type: String,
      default: "50 minutes",
    },
    examDate: {
      type: Date,
      required: [true, "examDate is required"],
    },
    examTime: {
      type: String,
      required: [true, "examTime is required"],
    },
    examType: {
      type: String,
      default: "Quiz",
    },

    examStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "live"],
    },

    Questions: [
      {
        type: Types.ObjectId,
        ref: "Question",
      },
    ],

    Createdby: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    totalMark: {
      type: Number,
      default: 100,
    },
    passMark: {
      type: Number,
      default: 50,
    },
    subjectId: {
      type: Types.ObjectId,
      ref: "Subject",
    },
    academicTermId: {
      type: Types.ObjectId,
      ref: "Academicterm",
    },
    AcademicYearId: {
      type: Types.ObjectId,
      ref: "AcademicYear",
    },
    program: {
      type: Types.ObjectId,
      ref: "program",
    },
    classLevel: {
      type: Types.ObjectId,
      ref: "classLevel",
    },
  },
  {
    timestamps: true,
  }
);

const ExamModel = mongoose.model("Exam", ExamSchema);
module.exports = ExamModel;
