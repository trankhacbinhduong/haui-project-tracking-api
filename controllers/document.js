const documentService = require("../services/document");
const catchAsyncError = require("../utils/catchAsyncError");

const getDocuments = catchAsyncError(async (req, res, next) => {
  const schoolYear = req.query.schoolYear || new Date().getFullYear();

  const documents = await documentService.getDocuments(+schoolYear);

  res.status(200).json(documents);
});

const createDocument = catchAsyncError(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file uploaded", 400));
  }

  const { originalname, path } = req.file;
  const {
    description,
    name = originalname,
    schoolYear = new Date().getFullYear(),
  } = req.body;

  const document = await documentService.createDocument({
    name,
    description,
    path,
    schoolYear: +schoolYear,
  });

  res.status(201).json(document);
});

module.exports = {
  getDocuments,
  createDocument,
};
