const mongoose = require("mongoose");

const { Types } = require("mongoose");

const programSchema = new mongoose.Schema(
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
      default: "4 years",
    },
    code: {
      type: String,
      required: true,
    },

    Createdby: {
      type: Types.ObjectId,
      ref: "Admin",
      required: true,
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
     subjects:[{
        type:Types.ObjectId ,
        ref: 'subject',
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtual: true },
  }
);

programSchema.virtual("subject", {
  ref: "Subject",
  localField: "_id",
  foreignField: "programId",
});

const programModel = mongoose.model("program", programSchema);
module.exports = programModel;
