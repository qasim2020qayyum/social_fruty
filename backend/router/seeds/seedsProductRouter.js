const express = require("express");
const router = express.Router();
const {
  addSeedsProductData,
  getAllSeedsProducts,
  getAllSeedsProductForAdmin,
  deleteSeedsProducts,
  getSingleSeedsProduct,
  updateSeedsProduct,
  getSeedsProducts,
  getProducts,
} = require("../../controllers/seeds/seedsProductController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/add/:seedsWarehouseId")
  .post(authenticateToken, checkBlockedStatus, addSeedsProductData)
  .get(getAllSeedsProducts);

router.route("/show/:seedsUserId").get(getSeedsProducts);

router.route("/all-products").get(getProducts);

router
  .route("/admin/get-all-seeds-products")
  .get(authenticateToken, authorizeAdmin, getAllSeedsProductForAdmin);

router
  .route("/products/:productId")
  .get(getSingleSeedsProduct)
  .put(authenticateToken, checkBlockedStatus, updateSeedsProduct)
  .delete(authenticateToken, checkBlockedStatus, deleteSeedsProducts);
module.exports = router;
