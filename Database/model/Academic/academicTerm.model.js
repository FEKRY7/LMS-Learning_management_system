const mongoose = require("mongoose");

const { Types } = require("mongoose");

const academictermSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name of year is required"],
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "3 months",
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

const AcademictermModel = mongoose.model("Academicterm", academictermSchema);
module.exports = AcademictermModel;
