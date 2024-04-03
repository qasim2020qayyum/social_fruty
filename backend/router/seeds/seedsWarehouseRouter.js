const express = require("express");
const router = express.Router();
const {
  addSeedsWarehouseData,
  getAllSeedsWarehouseData,
  getAllSeedsWarehousesForAdmin,
  getSingleWarehouseForUser,
  deleteWarehouse,
  editWarehouse,
} = require("../../controllers/seeds/seedsWarehouseController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/seedswarehouse-data/:farmerId")
  .post(authenticateToken, checkBlockedStatus, addSeedsWarehouseData)
  .get(getAllSeedsWarehouseData);

router
  .route("/admin/all-seedswarehouses")
  .get(authenticateToken, authorizeAdmin, getAllSeedsWarehousesForAdmin);

router
  .route("/:userId/industries/:warehouseId")
  .get(getSingleWarehouseForUser)
  .put(authenticateToken, editWarehouse)
  .delete(authenticateToken, deleteWarehouse);

module.exports = router;
