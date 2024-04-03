const mongoose = require("mongoose");

const farmerIndustrySchema = new mongoose.Schema(
  {
    farmer_id: {
      type: String,
      required: true,
    },
    farmer_name: {
      type: String,
      required: true,
    },
    farmer_email: {
      type: String,
      required: true,
    },
    farm_name: {
      type: String,
      required: true,
    },
    farm_size: {
      type: String,
      required: true,
    },
    type_of_farming: {
      type: String,
      required: true,
    },
    irrigation_methods_used: {
      type: String,
      required: true,
    },
    years_in_farming: {
      type: String,
      required: true,
    },
    // Crop/Livestock Details
    // can be in array
    crops_details: [
      {
        type: String,
        value: String,
      },
    ],
    products: [],
    // end can be in array
    any_challenge: {
      type: String,
    },
    tools_needed: {
      type: String,
    },
    sustainable_practices: {
      type: String,
    },
    certifications: {
      type: String,
    },
    marketing_strategies: {
      type: String,
    },
    local_farming_associations: {
      type: String,
    },
    farm_contact: {
      type: String,
      required: true,
      selected: false,
    },
    farm_address_street: {
      type: String,
    },
    farm_address_city: {
      type: String,
    },
    farm_address_state: {
      type: String,
    },
    farm_address_country: {
      type: String,
    },
    farm_address_postalCode: {
      type: String,
    },
   
    farm_image: String,
    farm_thumbnail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("farmerIndustry", farmerIndustrySchema);
