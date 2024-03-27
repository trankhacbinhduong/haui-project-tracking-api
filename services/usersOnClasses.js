const prisma = require("../prisma");

const createUsersOnClasses = async (data) => {
  return prisma.usersOnClasses.createMany({
    data,
  });
};

module.exports = {
  createUsersOnClasses,
};
