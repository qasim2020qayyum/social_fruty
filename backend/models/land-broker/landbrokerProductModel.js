const mongoose = require("mongoose");

const landbrokerProductSchema = new mongoose.Schema(
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

    product_name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    for_sale_or_rent: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },
    water_source_availibility: {
      type: String,
      required: true,
    },
    electric_source_availibility: {
      type: String,
      required: true,
    },
    soil_quality: {
      type: String,
      required: true,
    },
    permitted_land_usage: {
      type: String,
      required: true,
    },
    existing_building: {
      type: String,
      required: true,
    },
    distance_from_highway: {
      type: String,
      required: true,
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
     
    sale_price: {
      type: String,
    },
    rent_per_month_price: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("landbrokerProduct", landbrokerProductSchema);
