const programModel = require("../../../Database/model/Academic/program.model.js");
const AdminModel = require("../../../Database/model/staff/Admin.model.js");
const http = require("../../folderS,F,E/S,F,E.JS");
const { First, Second, Third } = require("../../utils/httperespons.js");

const Craeteprogram = async (req, res, next) => {
  try {
    const { Name } = req.body;
    req.body.Createdby = req.user._id;
    const Existprogram = await programModel.findOne({ Name });
    if (Existprogram) {
      return First(res, "this program Aready Exist", 404, http.FAIL);
    } else {
      const Program = await programModel.create(req.body);

      if (Program) {
        const Admin = await AdminModel.findByIdAndUpdate(req.user._id);
        Admin.progrm.push(Program._id);
        Admin.save();
      }
      return Second(res, ["program Added", { Program }], 200, http.SUCCESS);
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const Getprograms = async (req, res, next) => {
  try {
    const Checkprogram = await programModel.find({});
    if (!Checkprogram) {
      return First(res, "not found  program", 404, http.FAIL);
    }
    return Second(
      res,
      ["This is program", { Checkprogram }],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const GetSingleprogram = async (req, res, next) => {
  try {
    const program = await programModel.findById(req.params.id).populate({
      path: "subject",
      select: "Name description Createdby",
    });
    if (!program) {
      return First(
        res,
        `not found program by id: ${req.params.id}`,
        404,
        http.FAIL
      );
    }
    return Second(res, ["This is program", { program }], 200, http.SUCCESS);
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const Updateprogram = async (req, res, next) => {
  try {
    const { Name, description, duration, code } = req.body;
    req.body.UpdatedBy = req.user._id;
    const Checkexist = await programModel.findOne({ _id: req.params.id });
    console.log(Checkexist);

    if (!Checkexist) {
      return First(
        res,
        `program by id: ${req.params.id} not found`,
        404,
        http.FAIL
      );
    } else {
      const updatedProgram = await programModel
        .findByIdAndUpdate(
          req.params.id,
          {
            Name,
            description,
            duration,
            code,
          },
          { new: true }
        )
        .select("-updatedAt -createdAt -students -Teachers");

      return Second(
        res,
        [
          `progrm by id: ${req.params.id} Updated Succssfully`,
          { updatedProgram },
        ],
        200,
        http.SUCCESS
      );
    }
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

const DeleteProgram = async (req, res, next) => {
  try {
    const Checkprogram = await programModel.findByIdAndDelete(req.params.id);
    if (!Checkprogram) {
      return First(
        res,
        `program by id: ${req.params.id} not found`,
        404,
        http.FAIL
      );
    }

    return Second(
      res,
      [
        `program by id: ${req.params.id} Deleted Successfully`,
        { Checkprogram },
      ],
      200,
      http.SUCCESS
    );
  } catch (error) {
    console.error(error);
    return Third(res, "Internal Server Error", 500, http.ERROR);
  }
};

module.exports = {
  Craeteprogram,
  Getprograms,
  GetSingleprogram,
  Updateprogram,
  DeleteProgram,
};
