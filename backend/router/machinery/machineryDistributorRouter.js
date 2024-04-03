const express = require("express");
const router = express.Router();
const {
addMachineryDistributorData,
  getAllMachineryDistributorData,
  getAllMachineryDistributorsForAdmin,
  getSingleDistributorForUser,
  deleteDistributor,
  editDistributor,
} = require("../../controllers/machinery/machineryDistributorController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");
const { generateSignature } = require("../../middlewares/cloudinaryFileUpload");

router
  .route("/add-machinery-data/:farmerId")
  .post(authenticateToken, checkBlockedStatus, addMachineryDistributorData)
  .get(getAllMachineryDistributorData); // everyone

router
  .route("/admin/get-all-machinery-industries")
  .get(authenticateToken, authorizeAdmin, getAllMachineryDistributorsForAdmin);

router
  .route("/:userId/industries/:industryId")
  .get(getSingleDistributorForUser)
  .put(editDistributor) // Use the PUT method for updating an industry
  .delete(deleteDistributor);
module.exports = router;
