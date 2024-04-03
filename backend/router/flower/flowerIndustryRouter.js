const express = require("express");
const router = express.Router();

const {
  addFlowerWarehouseData,
  getAllFlowerWarehouseData,
  getSingleSeedWarehouse,
  deleteWarehouse,
  editWarehouse,
  getAllFlowerWarehousesForAdmin,
} = require("../../controllers/flower/flowerIndustryController");
const {
  checkBlockedStatus,
  authenticateToken,
  authorizeAdmin,
} = require("../../middlewares/authMiddleware");

router
  .route("/add-farm-data/:flowerId")
  .post(authenticateToken, checkBlockedStatus, addFlowerWarehouseData)
  .get(getAllFlowerWarehouseData);

router
  .route("/:userId/industries/:warehouseId")
  .get(getSingleSeedWarehouse)
  .put(authenticateToken, editWarehouse)
  .delete(authenticateToken, deleteWarehouse);

router
  .route("/admin/all-flowerwarehouses")
  .get(authenticateToken, authorizeAdmin, getAllFlowerWarehousesForAdmin);

module.exports = router;
