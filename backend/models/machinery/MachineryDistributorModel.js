const mongoose = require("mongoose");

const machineryDistributorSchema = new mongoose.Schema(
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
    certifications_and_licence_details: [
      {
        type: String,
        value: String,
      },
    ],
    products: [],
    marketing_strategies: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "machineryDistributors",
  machineryDistributorSchema
);
