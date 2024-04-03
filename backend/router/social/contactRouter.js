const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../../middlewares/authMiddleware");
const {
  addContacts,
  getContacts,
  getSingleContact,
  deleteContact,
} = require("../../controllers/social/contactsController");

router
  .route("/contacts/add/:user_id/:created_by")
  .post(authenticateToken, checkBlockedStatus, addContacts);
router
  .route("/contacts/delete/:user_id/:created_by")
  .delete(authenticateToken, checkBlockedStatus, deleteContact);
router
  .route("/contacts/:created_by")
  .get(authenticateToken, checkBlockedStatus, getContacts);
router
  .route("/contacts/single/:user_id")
  .get(authenticateToken, checkBlockedStatus, getSingleContact);

module.exports = router;
