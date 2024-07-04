const mongoose = require("mongoose");

const { Types } = require("mongoose");

const bcrypt = require("bcrypt");

const TeacherSchema = new mongoose.Schema({

   Name: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
   
    role: {
        type: String,
        default: 'Teacher',
        required: [true, 'role is required'],

        
    },
    confirmEmail: {
        type: Boolean,
        default:false,

    },
    Iswitdrawn: {
        type: Boolean,
        default:false,
    },
    IsSuspended: {
        type: Boolean,
        default:false,
    },
    subjects: {
        type: Types.ObjectId,
        ref:"subject",
    },
    applicationStatus: {
        type: String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }, 
    program: {
        type:String,
    },
    classLevel: {
        type:String,
    },
    exams: [{
        type: Types.ObjectId,
        ref:"Exam",
    }],
    createdBy: {
        type: Types.ObjectId,
        ref:"Admin",
    },
    AcademicYear: {
        type:String,
 
    },
    Academicterm: {
        type:String,
    },


}, {
    timestamps: true
})
//Hashing password using Hooks
TeacherSchema.pre("save",  async function (next) {
    this.password = await bcrypt.hashSync(this.password, 5)
    next()
})

const TeacherModel = mongoose.model('Teacher', TeacherSchema)
module.exports = TeacherModel