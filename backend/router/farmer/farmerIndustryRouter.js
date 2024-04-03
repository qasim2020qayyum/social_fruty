const express = require("express");
const router = express.Router();
const {
  addFarmerIndustryData,
  getAllFarmerIndustryData,
  getAllFarmerIndustriesForAdmin,
  getSingleIndustryForUser,
  deleteIndustry,
  editIndustry,
} = require("../../controllers/farmer/farmerIndustryController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");
const { generateSignature } = require("../../middlewares/cloudinaryFileUpload");

router
  .route("/add-farm-data/:farmerId")
  .post(authenticateToken, checkBlockedStatus, addFarmerIndustryData)
  .get( getAllFarmerIndustryData); // everyone

router
  .route("/admin/get-all-farmer-industries")
  .get(authenticateToken, authorizeAdmin, getAllFarmerIndustriesForAdmin);

router
  .route("/:userId/industries/:industryId")
  .get(getSingleIndustryForUser)
  .put(editIndustry) // Use the PUT method for updating an industry
  .delete(deleteIndustry);
module.exports = router;
