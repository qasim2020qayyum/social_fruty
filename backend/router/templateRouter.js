const express = require("express");
const router = express.Router();
const {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

// Define routes
router.post("/", createTemplate);
router.get("/", getAllTemplates);
router.get("/:templateId", getTemplateById);
router.put("/:templateId", updateTemplate);
router.delete("/:templateId", deleteTemplate);

module.exports = router;
