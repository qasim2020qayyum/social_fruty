const express = require("express");
const router = express.Router();
const {
  addWholesalerProductData,
  getAllWholesalerProducts,
  getAllWholesalerProductForAdmin,
  deleteWholesalerProducts,
  getSingleWholesalerProduct,
  updateWholesalerProduct,
  getWholesalerProducts,
  getProducts,
} = require("../../controllers/whole-saler/wholesalerProductController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/add/:wholesalerWarehouseId")
  .post(authenticateToken, checkBlockedStatus, addWholesalerProductData)
  .get(getAllWholesalerProducts);
  
router.route("/show/:wholesalerId").get(getWholesalerProducts);

router.route("/all-products").get(getProducts);

router
  .route("/admin/get-all-wholesaler-products")
  .get(authenticateToken, authorizeAdmin, getAllWholesalerProductForAdmin);

router
  .route("/products/:productId")
  .get(getSingleWholesalerProduct)
  .put(authenticateToken, checkBlockedStatus, updateWholesalerProduct)
  .delete(authenticateToken, checkBlockedStatus, deleteWholesalerProducts);
module.exports = router;
