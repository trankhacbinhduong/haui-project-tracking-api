const prisma = require("../prisma");

const getDocuments = (schoolYear) => {
  return prisma.document.findMany({
    where: { schoolYear },
  });
};

module.exports = {
  getDocuments,
};
