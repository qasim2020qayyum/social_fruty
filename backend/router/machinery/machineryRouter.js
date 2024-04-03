const express = require("express");
const router = express.Router();

const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");
const { generateSignature } = require("../../middlewares/cloudinaryFileUpload");
const {
  addNewMachineryDistributorData,
  getAllNewMachineryData,
  getAllMachineryForAdmin,
  getSingleMachinery,
  deleteMachinery,
  updateMachinery,
  getProducts,
  getAllMachineryProducts,
} = require("../../controllers/machinery/machineryController");

router
  .route("/addmachinery/:machineryDistributorId")
  .post(authenticateToken, checkBlockedStatus, addNewMachineryDistributorData)
  .get(getAllNewMachineryData);

router.route("/show/:machineryId").get(getAllMachineryProducts); 

router
  .route("/all-products").get(getProducts); // everyone

router 
  .route("/admin/get-all-machinery")
  .get(authenticateToken, authorizeAdmin, getAllMachineryForAdmin);
router
  .route("/machinery/:machineryId")
  .get(getSingleMachinery)
  .delete(authenticateToken, deleteMachinery)
  .put(authenticateToken, updateMachinery);

module.exports = router;
