const mongoose = require("mongoose");

const { Types } = require("mongoose");

const classLevelSchema = new mongoose.Schema(
  {
    //Ex:100/200/300
    Name: {
      type: String,
      required: [true, "Name of ClassLevel is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },

    Createdby: {
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
    subjects: [
      {
        type: Types.ObjectId,
        ref: "subject",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const classLevelModel = mongoose.model("classLevel", classLevelSchema);
module.exports = classLevelModel;
