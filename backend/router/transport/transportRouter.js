const express = require("express");
const router = express.Router();
const {
  addTransportData,
  getAllTransportData,
  getAllTransportsForAdmin,
  getSingleTransportForUser,
  deleteTransport,
  editTransport,
} = require("../../controllers/transport/transportController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/transport-data/:farmerId")
  .post(authenticateToken, checkBlockedStatus, addTransportData)
  .get(getAllTransportData);

router
  .route("/admin/all-transports")
  .get(authenticateToken, authorizeAdmin, getAllTransportsForAdmin);

router
  .route("/:userId/industries/:transportId")
  .get(getSingleTransportForUser)
  .put(authenticateToken, editTransport)
  .delete(authenticateToken, deleteTransport);

module.exports = router;
