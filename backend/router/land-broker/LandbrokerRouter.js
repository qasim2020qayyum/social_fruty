const express = require("express");
const router = express.Router();
const {
  addLandbrokerData,
  getAllLandbrokerData,
  getAllLandbrokersForAdmin,
  getSingleLandbrokerForUser,
  deleteLandbroker,
  editLandbroker,
} = require("../../controllers/land-broker/LandbrokerController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/landbroker-data/:farmerId")
  .post(authenticateToken, checkBlockedStatus, addLandbrokerData)
  .get(getAllLandbrokerData);

router 
  .route("/admin/all-landbrokers")
  .get(authenticateToken, authorizeAdmin, getAllLandbrokersForAdmin);

router
  .route("/:userId/industries/:brokerId")
  .get(getSingleLandbrokerForUser)
  .put(authenticateToken, editLandbroker)
  .delete(authenticateToken, deleteLandbroker);

module.exports = router;
