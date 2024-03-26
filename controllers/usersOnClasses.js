const catchAsyncError = require("../utils/catchAsyncError");
const usersOnClassesService = require("../services/usersOnClasses");

const createUsersOnClasses = catchAsyncError(async (req, res, next) => {
  const usersOnClasses = await usersOnClassesService.createUsersOnClasses(
    req.body
  );

  res.status(201).json(usersOnClasses);
});

module.exports = {
  createUsersOnClasses,
};
