const Template = require("../models/templateModel");

// Create Template
const createTemplate = async (req, res) => {
  try {
    const { name, subject, body, type } = req.body;
    const template = new Template({ name, subject, body, type });
    await template.save();
    res.status(201).json({ message: "Template created successfully", template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Templates
const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json({ templates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Template by ID
const getTemplateById = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json({ template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Template
const updateTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { name, subject, body, type } = req.body;
    const template = await Template.findByIdAndUpdate(
      templateId,
      { name, subject, body, type },
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json({ message: "Template updated successfully", template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Template
const deleteTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const template = await Template.findByIdAndDelete(templateId);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.status(200).json({ message: "Template deleted successfully", template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};
