const Employee = require("../models/employeeModel");
const { validationResult } = require("express-validator");

const requiredFields = ["first_name", "cnic", "mobile_no"];

const addEmployee = async (req, res) => {
  // Extract industry_id from request parameters
  const industry_id = req.params.industry_id;
  // const user = await User.findById(farmerId);
  // Validate required fields
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `${field} is required` });
    }
  }
  // Calculate remaining_salary based on job_salary and advance_salary
  const job_salary = req.body.job_salary || 0;
  const advance_salary = req.body.advance_salary || 0;
  const remaining_salary = job_salary - advance_salary;

  // Create a new employee instance
  const newEmployee = new Employee({
    ...req.body,
    industry_id,
    remaining_salary: remaining_salary.toString(),
  });

  try {
    // Save the new employee
    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const employeesPerPage = 10; // Number of employees per page
    const totalEmployees = await Employee.countDocuments(); // Get the total number of employees

    const from = (page - 1) * employeesPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + employeesPerPage - 1, totalEmployees); // Calculate 'to' value

    const employees = await Employee.find()
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(employeesPerPage * (page - 1)) // Skip employees based on the current page
      .limit(employeesPerPage); // Limit the number of employees per page

    const totalPages = Math.ceil(totalEmployees / employeesPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      employees,
      meta: {
        currentPage: page,
        totalPages,
        totalEmployees,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEmployeesByIndustryId = async (req, res) => {
  try {
    const industry_id = req.params.industry_id;
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const employeesPerPage = 10; // Number of employees per page

    const totalEmployees = await Employee.countDocuments({ industry_id }); // Get the total number of employees with the specified industry_id

    const from = (page - 1) * employeesPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + employeesPerPage - 1, totalEmployees); // Calculate 'to' value

    const employees = await Employee.find({ industry_id })
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(employeesPerPage * (page - 1)) // Skip employees based on the current page
      .limit(employeesPerPage); // Limit the number of employees per page

    const totalPages = Math.ceil(totalEmployees / employeesPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      employees,
      meta: {
        currentPage: page,
        totalPages,
        totalEmployees,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllEmployeesByUser = async (req, res) => {
  try {
    const employeer_id = req.params.employeer_id;
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const employeesPerPage = 10; // Number of employees per page

    const totalEmployees = await Employee.countDocuments({ employeer_id }); // Get the total number of employees with the specified industry_id

    const from = (page - 1) * employeesPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + employeesPerPage - 1, totalEmployees); // Calculate 'to' value

    const employees = await Employee.find({ employeer_id })
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(employeesPerPage * (page - 1)) // Skip employees based on the current page
      .limit(employeesPerPage); // Limit the number of employees per page

    const totalPages = Math.ceil(totalEmployees / employeesPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      employees,
      meta: {
        currentPage: page,
        totalPages,
        totalEmployees,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const employee_id = req.params.employee_id;

  try {
    const employee = await Employee.findOne({ _id: employee_id });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const employee_id = req.params.employee_id;
  try {
    const employeee = await Employee.findOne({ _id: employee_id });
    if (!employeee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const employee = await Employee.findOneAndDelete({ _id: employee_id });
    res
      .status(200)
      .json({ message: "Employee deleted successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editEmployee = async (req, res) => {
  const employee_id = req.params.employee_id;
  try {
    const employeeToUpdate = await Employee.findOne({ _id: employee_id });

    if (!employeeToUpdate) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Validate required fields
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // Calculate remaining_salary based on job_salary and advance_salary
    const job_salary = req.body.job_salary || 0;
    const advance_salary = req.body.advance_salary || 0;
    const remaining_salary = job_salary - advance_salary;

    // Update the employee fields
    employeeToUpdate.set({
      ...req.body,
      remaining_salary: remaining_salary.toString(),
    });

    // Save the updated employee
    await employeeToUpdate.save();

    res.status(200).json({
      message: "Employee updated successfully",
      employee: employeeToUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  addEmployee,
  getAllEmployees,
  getAllEmployeesByIndustryId,
  getEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployeesByUser
};
