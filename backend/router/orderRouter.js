const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getOrdersByBuyerId,
  getOrdersByUserId,
  getSingleOrderByUserId,
  getSingleOrderByBuyerId,
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticateToken, checkBlockedStatus, createOrder)
  .get(authenticateToken, authorizeAdmin, getAllOrders); //admin
router
  .route("/:buyerId")
  .get(authenticateToken, checkBlockedStatus, getOrdersByBuyerId);
router
  .route("/owner/:userId")
  .get(authenticateToken, checkBlockedStatus, getOrdersByUserId);
router
  .route("/single/:userId/:orderId")
  .get(authenticateToken, checkBlockedStatus, getSingleOrderByUserId);
router
  .route("/single/:orderId")
  .get(authenticateToken, checkBlockedStatus, getSingleOrderByBuyerId);

module.exports = router;
