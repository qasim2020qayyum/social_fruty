const mongoose = require("mongoose");

const rawMaterialWarehouseSchema = new mongoose.Schema(
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

    marketing_strategies: {
      type: String,
    },
    areas_covered: {
      type: String,
    },
    transportation_partner: {
      type: String,
    },

    products: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "rawMaterialWarehouse",
  rawMaterialWarehouseSchema
);
