const mongoose = require("mongoose");

const { Types } = require("mongoose");

const YearGroupSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name of year is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    AcademicYaer: {
      type: Types.ObjectId,
      ref: "AcademicYear",
    },

    Createdby: {
      type: Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

const YearGroupModel = mongoose.model("YearGroup", YearGroupSchema);
module.exports = YearGroupModel;
