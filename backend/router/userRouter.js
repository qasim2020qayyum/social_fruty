const express = require("express");
const {
  signup,
  login,
  getAllUsers,
  getSingleUserProfile,
  editUserRole,
  editOwnUserData,
  blockUser,
  logout,
  deleteUser,
  getUsersByRole,
  getSingleUserById,
  editUser,
  deletePictureFromCloud,
  getUsersByRoleFrontEnd,
  otpCheck,
  resendOtp,
  forgetPassword,
  getUsersExceptFollowing,
} = require("../controllers/userController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middlewares/authMiddleware");
const { generateSignature } = require("../middlewares/cloudinaryFileUpload");
const router = express.Router();

router
  .route("/")
  .post(signup)
  .get(authenticateToken, checkBlockedStatus, getSingleUserProfile); // everyone
// login user
router.route("/login").post(login); // everyone
router.route("/otp-request").post(otpCheck); // everyone
router.route("/otp-resend").post(resendOtp); // everyone
router.route("/forget-password").post(forgetPassword); // everyone
// get all user only admin
router.route("/users").get(authenticateToken, authorizeAdmin, getAllUsers); // --admin
// update user role only admin
router.route("/role").put(authenticateToken, authorizeAdmin, editUserRole); // --admin
// update own user data
router
  .route("/edit")
  .put(authenticateToken, checkBlockedStatus, editOwnUserData); // everyone
router
  .route("/social/allusers")
  .get(authenticateToken, checkBlockedStatus, getUsersExceptFollowing); // everyone
// block user only admin
router.route("/block").put(authenticateToken, authorizeAdmin, blockUser); // --admin
router.route("/logout").get(logout); // everyone
// get single user by ID
router.route("/users/:userId").get(getSingleUserById); // everyone
// get user by role
router.route("/users/role/:role").get(authenticateToken, getUsersByRole);
router.route("/all/role/:role").get(getUsersByRoleFrontEnd);
// for upload on cloudnary
router.route("/sign-upload").post(generateSignature); // everyone
// delete user only admin
router
  .route("/delete/:userId")
  .delete(authenticateToken, authorizeAdmin, deleteUser); // --admins
router
  .route("/deleteImage/:userId")
  .delete(authenticateToken, deletePictureFromCloud); // --admins
// update user only admin
router.route("/edit/:userId").put(authenticateToken, authorizeAdmin, editUser);
module.exports = router;
