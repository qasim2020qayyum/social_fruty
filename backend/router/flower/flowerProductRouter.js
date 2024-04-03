const express = require("express");
const { authenticateToken, checkBlockedStatus } = require("../../middlewares/authMiddleware");
const { addFlowerProductData } = require("../../controllers/flower/flowerProductController");
const router = express.Router();


router
  .route("/add/:flowerWarehouseId")
  .post(authenticateToken, checkBlockedStatus, addFlowerProductData)
//   .get(getAllWholesalerProducts);
  
// router.route("/show/:wholesalerId").get(getWholesalerProducts);

// router.route("/all-products").get(getProducts);

// router
//   .route("/admin/get-all-wholesaler-products")
//   .get(authenticateToken, authorizeAdmin, getAllWholesalerProductForAdmin);

// router
//   .route("/products/:productId")
//   .get(getSingleWholesalerProduct)
//   .put(authenticateToken, checkBlockedStatus, updateWholesalerProduct)
//   .delete(authenticateToken, checkBlockedStatus, deleteWholesalerProducts);
module.exports = router;
