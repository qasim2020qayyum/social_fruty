const express = require("express");
const router = express.Router();
const {
  addTransportProductData,
  getAllTransportProducts,
  getAllTransportProductForAdmin,
  deleteTransportProducts,
  getSingleTransportProduct,
  updateTransportProduct,
  getProducts,
  getAllTransporterProducts,
} = require("../../controllers/transport/transportProductController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/add/:transportWarehouseId")
  .post(authenticateToken, checkBlockedStatus, addTransportProductData)
  .get(getAllTransportProducts);
router
  .route("/show/:transportId").get(getAllTransporterProducts);

router.route("/all-products").get(getProducts);

router
  .route("/admin/get-all-transport-products")
  .get(authenticateToken, authorizeAdmin, getAllTransportProductForAdmin);

router
  .route("/products/:productId")
  .get(getSingleTransportProduct)
  .put(authenticateToken, checkBlockedStatus, updateTransportProduct)
  .delete(authenticateToken, checkBlockedStatus, deleteTransportProducts);
module.exports = router;
