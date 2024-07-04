const mongoose = require("mongoose");

const { Types } = require("mongoose");

const academicYearSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name of year is required"],
    },
    IsCurrent: {
      type: Boolean,
      default: false,
    },
    fromYear: {
      type: Date,
      required: true,
    },
    ToYear: {
      type: Date,
      required: true,
    },

    Createdby: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    UpdatedBy: {
      type: Types.ObjectId,
      ref: "Admin",
    },
    Teachers: [
      {
        type: Types.ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: Types.ObjectId,
        ref: "student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AcademicYearModel = mongoose.model("AcademicYear", academicYearSchema);
module.exports = AcademicYearModel;
