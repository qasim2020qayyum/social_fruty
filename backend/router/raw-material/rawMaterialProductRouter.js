const express = require("express");
const router = express.Router();
const {
  addRawMaterialProductData,
  getAllRawMaterialProducts,
  getAllRawMaterialProductForAdmin,
  deleteRawMaterialProducts,
  getSingleRawMaterialProduct,
  updateRawMaterialProduct,
  getProducts,
  getAllRawMaterialProductsByUser,
} = require("../../controllers/raw-material/rawMaterialProductController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/add/:rawMaterialWarehouseId")
  .post(authenticateToken, checkBlockedStatus, addRawMaterialProductData)
  .get(getAllRawMaterialProducts);
router
  .route("/show/:rawMaterial").get(getAllRawMaterialProductsByUser);
  
router.route("/all-products").get(getProducts);

router
  .route("/admin/get-all-rawmaterial-products")
  .get(authenticateToken, authorizeAdmin, getAllRawMaterialProductForAdmin);

router
  .route("/products/:productId")
  .get(getSingleRawMaterialProduct)
  .put(authenticateToken, checkBlockedStatus, updateRawMaterialProduct)
  .delete(authenticateToken, checkBlockedStatus, deleteRawMaterialProducts);
module.exports = router;
