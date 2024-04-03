const express = require("express");
const router = express.Router();
const {
  addFarmerProductData,
  getAllFarmerProducts,
  getAllFarmerProductForAdmin,
  deleteFarmerProducts,
  getSingleFarmerProduct,
  updateFarmerProduct,
  getAllFarmerProductsFarmer,
  getAllProducts,
} = require("../../controllers/farmer/farmerProductController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");

router
  .route("/add/:farmerFarmId")
  .post(authenticateToken, checkBlockedStatus, addFarmerProductData)
  .get(getAllFarmerProducts);

router.route("/show/:farmerFarmId").get(getAllFarmerProductsFarmer);
router.route("/all-products").get(getAllProducts);

router
  .route("/admin/get-all-farmer-products")
  .get(authenticateToken, authorizeAdmin, getAllFarmerProductForAdmin);

router
  .route("/products/:productId")
  .get(getSingleFarmerProduct)
  .put(authenticateToken, checkBlockedStatus, updateFarmerProduct)
  .delete(authenticateToken, checkBlockedStatus, deleteFarmerProducts);
module.exports = router;
