const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    farmer_id: {
      type: String,
      required: true,
    },
    farmer_name: {
      type: String,
      required: true,
    },
    farm_name: {
      type: String,
      required: true,
    },
    farmer_email: {
      type: String,
      required: true,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
      selected: false,
    },
    email: {
      type: String,
    },
    types_of_transportation: {
      type: String,
    },
    coverage_area: {
      type: String,
    },
    service_hours_in_country: {
      type: String,
    },
    service_hours_out_of_country: {
      type: String,
    },
    insurance_coverage_offered: {
      type: String,
    },
    products: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "transport",
  transportSchema
);
