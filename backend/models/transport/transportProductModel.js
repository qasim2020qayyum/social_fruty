const mongoose = require("mongoose");

const transportProductSchema = new mongoose.Schema(
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
    farm_id: {
      type: String,
      required: true,
    },

    vehicles_number: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
    },
    vehicles_brand: {
      type: String,
      required: true,
    },
    capacity_of_vehicles: {
      type: String,
      required: true,
    },
    rent_per_day_price: {
      type: String,
    },
    rent_per_hours_price: {
      type: String,
    },
    description: {
      type: String,
    },

    image: {
      type: String,
    },
    image2: {
      type: String,
    },
    image3: {
      type: String,
    },
    image4: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("transportProduct", transportProductSchema);
