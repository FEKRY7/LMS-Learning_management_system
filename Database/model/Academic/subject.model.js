const mongoose = require("mongoose");

const { Types } = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "userName is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    duration: {
      type: String,
      default: "3 months",
    },

    Createdby: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    UpdatedBy: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    Teachers: {
      type: Types.ObjectId,
      ref: "Teacher",
    },
    Academicterm: {
      type: Types.ObjectId,
      ref: "Academicterm",
    },
    programId: {
      type: Types.ObjectId,
      ref: "program",
    },
  },
  {
    timestamps: true,
  }
);

const subjectModel = mongoose.model("Subject", subjectSchema);
module.exports = subjectModel;
