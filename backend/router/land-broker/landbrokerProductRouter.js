const express = require("express");
const router = express.Router();
const {
  addLandBrokerProductData,
  getAllLandBrokerProducts,
  getAllLandBrokerProductForAdmin,
  deleteLandBrokerProducts,
  getSingleLandBrokerProduct,
  updateLandBrokerProduct,
  getLandBrokerProducts,
  getProducts,
} = require("../../controllers/land-broker/landbrokerProductController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/add/:landBrokerWarehouseId")
  .post(authenticateToken, checkBlockedStatus, addLandBrokerProductData)
  .get(getAllLandBrokerProducts);

router.route("/show/:landBrokerId").get(getLandBrokerProducts);
router.route("/all-products").get(getProducts);

router
  .route("/admin/get-all-landbroker-products")
  .get(authenticateToken, authorizeAdmin, getAllLandBrokerProductForAdmin);

router
  .route("/products/:productId")
  .get(getSingleLandBrokerProduct)
  .put(authenticateToken, checkBlockedStatus, updateLandBrokerProduct)
  .delete(authenticateToken, checkBlockedStatus, deleteLandBrokerProducts);
module.exports = router;
