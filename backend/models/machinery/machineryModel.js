const mongoose = require("mongoose");

const machinerySchema = new mongoose.Schema(
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



    type_of_machinery: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
    },
    brand: {
      type: String,
    },
    model_number: {
      type: String,
    },
    stock: {
      type: String,
    },
    new_or_used: {
      type: String,
    },
    lease_or_sale: {
      type: String,
    },
    technical_specification: {
      type: String,
    },
    compatibility: {
      type: String,
    },
    distribution_and_delivery: {
      type: String,
    },
    service_and_support: {
      type: String,
    },
    after_sales_service_offered: {
      type: String,
    },
    warranty: {
      type: String,
    },
    maintenance_and_repair_services: {
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

module.exports = mongoose.model("machines", machinerySchema);
