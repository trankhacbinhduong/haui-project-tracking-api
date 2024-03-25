const express = require("express");

const documentController = require("../controllers/document");
const authMiddleware = require("../middlewares/auth");
const restrictTo = require("../middlewares/role");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.use(authMiddleware);

router.get("/", documentController.getDocuments);

router.post(
  "/",
  restrictTo("admin"),
  uploadMiddleware.single("document"),
  documentController.createDocument
);

module.exports = router;
