const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    industry_id: {
      type: String,
      required: true,
    },
    industry_name: {
      type: String,
      required: true,
    },
    employeer_id: {
      type: String,
      required: true,
    },
    employeer_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    father_name: {
      type: String,
    },
    cnic: {
      type: String,
      required: true,
      unique: true,
    },
    address_street: {
      type: String,
    },
    address_city: {
      type: String,
    },
    address_state: {
      type: String,
    },
    address_country: {
      type: String,
    },
    address_postalCode: {
      type: String,
    },
    phone: {
      type: String,
    },
    mobile_no: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    dob: {
      type: Date,
    },
    maritalStatus: {
      type: String,
    },
    profilePicture: String,
    job_title: {
      type: String,
    },
    job_employeeID: {
      type: String,
    },
    job_work_location: {
      type: String,
    },
    job_department: {
      type: String,
    },
    job_start_date: {
      type: String,
    },
    job_salary: {
      type: String,
    },
    advance_salary: {
      type: String,
    },
    remaining_salary: {
      type: String,
    },
    emergency_name: {
      type: String,
    },
    emergency_address: {
      type: String,
    },
    emergency_number: {
      type: String,
    },
    emergency_relationship: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employees", employeeSchema);
