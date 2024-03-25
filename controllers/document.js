const documentService = require("../services/document");
const catchAsyncError = require("../utils/catchAsyncError");

const getDocuments = catchAsyncError(async (req, res, next) => {
  const schoolYear = req.query.schoolYear || new Date().getFullYear();

  const documents = await documentService.getDocuments(+schoolYear);

  res.status(200).json(documents);
});

module.exports = {
  getDocuments,
};
