const classService = require("../services/class");
const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");

const createClass = catchAsyncError(async (req, res, next) => {
  const newClass = await classService.createClass(req.body);
  res.status(201).json(newClass);
});

const getClasses = catchAsyncError(async (req, res, next) => {
  const { id: teacherId } = req.params;

  const isAdmin = req.user.role === "admin";
  if (!teacherId && !isAdmin) {
    return next(
      new AppError("You are not allowed to perform this action", 403)
    );
  }

  const query = teacherId ? { teacherId: +teacherId } : {};
  const classes = await classService.getClasses(query);

  res.status(200).json(classes);
});

const getClass = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const classDetail = await classService.getClass(+id);

  if (!classDetail) {
    return next(new AppError("Class not found", 404));
  }

  res.status(200).json(classDetail);
});

const updateClass = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const classDetail = await classService.getClass(+id);
  if (!classDetail) {
    return next(new AppError("Class not found", 404));
  }

  const isAdmin = req.user.role === "admin";
  const isTeacher = classDetail.teacherId === req.user.id;
  if (!isAdmin && !isTeacher) {
    return next(
      new AppError("You are not allowed to perform this action", 403)
    );
  }

  const updatedClass = await classService.updateClass(+id, req.body);

  res.status(200).json(updatedClass);
});

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
};
