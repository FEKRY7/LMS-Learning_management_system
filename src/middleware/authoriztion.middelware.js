const AdminModel = require("../../Database/model/staff/Admin.model.js");
const TeacherModel = require("../../Database/model/staff/teacherModel.model.js");
const studentModel = require("../../Database/model/Academic/StudentModel.model.js");

const http = require("../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../utils/httperespons.js");

const isAuthorized = (...roles)=>{
    return (req , res , next)=>{
        if (!roles.includes(req.user.role))
        return First(res,"not authorized user",403,http.FAIL)
        
        return next()
    }
}

const selectModel = (role) => {
    let userCollection;

    if (role === 'student') {
        userCollection = studentModel;
    } else if (role === 'Teacher') {
        userCollection = TeacherModel;
    } else if (role === 'Admin') {
        userCollection = AdminModel;
    } else {
        return null;
    }
    return userCollection

}

module.exports = {
    isAuthorized,
    selectModel
}