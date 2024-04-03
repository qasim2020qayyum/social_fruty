const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middlewares/authMiddleware");
const {
  addEmployee,
  getAllEmployees,
  getAllEmployeesByIndustryId,
  getEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployeesByUser,
} = require("../controllers/employeeController");

router
  .route("/add/:industry_id")
  .post(authenticateToken, checkBlockedStatus, addEmployee);
router
  .route("/update/:employee_id")
  .put(authenticateToken, checkBlockedStatus, editEmployee);

router
  .route("/all_employee")
  .get(authenticateToken, authorizeAdmin, getAllEmployees);

router
  .route("/:industry_id/industry_employee")
  .get(authenticateToken, getAllEmployeesByIndustryId);
router
  .route("/:employeer_id/employees")
  .get(authenticateToken, getAllEmployeesByUser);

router
  .route("/single/:employee_id")
  .get(authenticateToken, getEmployee);
router
  .route("/delete/:employee_id")
  .delete(authenticateToken, deleteEmployee);

module.exports = router;
