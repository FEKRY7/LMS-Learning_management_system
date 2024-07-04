const mongoose = require("mongoose");

const { Types } = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    email: {
      type: String,
      unique: [true, "email must be unique value"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },

    role: {
      type: String,
      default: "Admin",
      required: [true, "role is required"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    classLevel: [
      {
        type: Types.ObjectId,
        ref: "classLevel",
      },
    ],
    AcademicYear: [
      {
        type: Types.ObjectId,
        ref: "AcademicYear",
      },
    ],
    Academicterm: [
      {
        type: Types.ObjectId,
        ref: "Academicterm",
      },
    ],
    Teachers: [
      {
        type: Types.ObjectId,
        ref: "Teacher",
      },
    ],
    Studens: [
      {
        type: Types.ObjectId,
        ref: "Student",
      },
    ],
    progrm: [
      {
        type: Types.ObjectId,
        ref: "Program",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Hashing password using Hooks
AdminSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password,5)
  next()
})

const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
