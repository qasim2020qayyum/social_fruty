const express = require("express");
const router = express.Router();

const {
  addRawMaterialWarehouseData,
  getAllRawMaterialWarehouseData,
  getAllRawMaterialWarehousesForAdmin,
  getSingleRawMaterialWarehouseForUser,
  deleteRawMaterialWarehouse,
  editRawMaterialWarehouse,
} = require("../../controllers/raw-material/rawMaterialWarehouseController");

const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router 
  .route("/rawmaterial-data/:farmerId")
  .post(authenticateToken, checkBlockedStatus, addRawMaterialWarehouseData)
  .get(getAllRawMaterialWarehouseData);

router
  .route("/admin/allrawmaterial")
  .get(authenticateToken, authorizeAdmin, getAllRawMaterialWarehousesForAdmin);

router
  .route("/:userId/industries/:warehouseId")
  .get(getSingleRawMaterialWarehouseForUser)
  .put(authenticateToken, editRawMaterialWarehouse)
  .delete(authenticateToken, deleteRawMaterialWarehouse);

module.exports = router;
