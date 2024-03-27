const AppError = require("../utils/AppError");
const catchAsyncError = require("../utils/catchAsyncError");
const usersOnClassesService = require("../services/usersOnClasses");
const excelService = require("../services/excel");
const classService = require("../services/class");
const userService = require("../services/user");
const projectService = require("../services/project");
const bcryptService = require("../services/bcrypt");

const createUsersOnClasses = catchAsyncError(async (req, res, next) => {
  const { classId } = req.body;
  if (!classId) {
    return next(new AppError("Class is required", 400));
  }

  const { teacherId } = await classService.getClass(+classId);
  if (teacherId !== req.user.id) {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }

  if (!req.file) {
    return next(new AppError("File is required", 400));
  }

  if (
    req.file.mimetype !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return next(new AppError("Invalid file type", 400));
  }

  // Read file
  const data = excelService.parseUsersOnClassesFile(req.file);
  const rawPassword = "User@123";
  const password = await bcryptService.hash(rawPassword);
  const userData = data.map(({ name, studentCode, email }) => {
    return {
      name,
      studentCode: studentCode.toString(),
      email,
      password,
    };
  });

  const projectData = data.map(
    ({ projectName: name, projectDescription: description }) => {
      return {
        name,
        description,
      };
    }
  );

  await userService.createUsers(userData);
  const studentCodes = userData.map(({ studentCode }) => studentCode);
  const users = await userService.getUsers({
    studentCode: {
      in: studentCodes,
    },
  });

  await projectService.createProjects(projectData);
  const projectNames = projectData.map(({ name }) => name);
  const projects = await projectService.getProjects({
    name: {
      in: projectNames,
    },
  });

  const usersOnClassesData = users.map((user, index) => {
    return {
      classId: +classId,
      userId: user.id,
      projectId: projects[index].id,
    };
  });

  const usersOnClasses = await usersOnClassesService.createUsersOnClasses(
    usersOnClassesData
  );

  res.status(201).json(usersOnClasses);
});

module.exports = {
  createUsersOnClasses,
};
