const prisma = require("../prisma");

const getDocuments = (schoolYear) => {
  return prisma.document.findMany({
    where: { schoolYear },
  });
};

const createDocument = (data) => {
  return prisma.document.create({
    data,
  });
};

module.exports = {
  getDocuments,
  createDocument,
};
