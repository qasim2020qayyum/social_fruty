const mongoose = require("mongoose");

const seedsProductSchema = new mongoose.Schema(
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
    types_of_seeds: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    quantity_in_kg_for_one_stock: {
      type: String,
    },
    availibility_in_country: {
      type: String,
    },
    product_price: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
    },
    after_discount: {
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

module.exports = mongoose.model("seedsProducts", seedsProductSchema);
