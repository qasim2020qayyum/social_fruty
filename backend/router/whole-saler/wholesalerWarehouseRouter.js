const express = require("express");
const router = express.Router();
const {
  addWholesalerWarehouseData,
  getAllWholesalerWarehouseData,
  getAllWholesalerWarehousesForAdmin,
  getSingleWarehouseForUser,
  deleteWarehouse,
  editWarehouse,
} = require("../../controllers/whole-saler/wholesalerWarehouseController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/warehousedata/:farmerId")
  .post(authenticateToken, checkBlockedStatus, addWholesalerWarehouseData)
  .get(getAllWholesalerWarehouseData); // everyone

router
  .route("/admin/allwarehouses")
  .get(authenticateToken, authorizeAdmin, getAllWholesalerWarehousesForAdmin);

router
  .route("/:userId/industries/:warehouseId")
  .get(getSingleWarehouseForUser)
  .put(authenticateToken, editWarehouse)
  .delete(authenticateToken, deleteWarehouse);

module.exports = router;
