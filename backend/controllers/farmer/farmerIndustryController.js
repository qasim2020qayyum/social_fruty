const FarmerIndustry = require("../../models/farmer/farmerIndustryModel");
const User = require("../../models/userModel");

// Controller to add data to Farmer Industry
const addFarmerIndustryData = async (req, res) => {
  try {
    
    const { farmerId } = req.params;
    const user = await User.findById(farmerId);

    // Check if the user with the provided ID exists and has the role "farmer" or "admin"
    if (!user || (user.role !== "farmer" && user.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Unauthorized. User is not a farmer or admin." });
    }
    const {
      farm_name,
      farm_size,
      type_of_farming,
      irrigation_methods_used,
      years_in_farming,   
      crops_details,
      any_challenge,
      tools_needed,
      sustainable_practices,
      certifications,
      marketing_strategies,
      local_farming_associations,
      farm_contact,
      farm_address_street,
      farm_address_city,
      farm_address_state,
      farm_address_country,
      farm_address_postalCode,
      farm_image,
      farm_thumbnail,
    } = req.body;

    // Create a new instance of the Farmer Industry model
    const newFarmerIndustry = new FarmerIndustry({
      farmer_id: farmerId,
      farmer_name: user.name,
      farmer_email: user.email,
      farm_name,
      farm_size,
      type_of_farming,
      irrigation_methods_used,
      years_in_farming,
      crops_details,
      any_challenge,
      tools_needed,
      sustainable_practices,
      certifications,
      marketing_strategies,
      local_farming_associations,
      farm_contact,
      farm_address_street,
      farm_address_city,
      farm_address_state,
      farm_address_country,
      farm_address_postalCode,
      farm_image,
      farm_thumbnail,
    });

    // Save the new Farmer Industry data
    const farm = await newFarmerIndustry.save();
    if (farm) {
      user.industries.push({
        _id: farm._id, // Use the new industry _id
        name: farm_name,
        details: crops_details,
      });
    }
    const updatedUser = await user.save();
    // Respond with a success message
    res
      .status(201)
      .json({ message: "Farm added successfully", farm, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Farmer Industry data for a specific farmer
const getAllFarmerIndustryData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const industriesPerPage = 10; // Number of industries per page

    // Get the total number of Farmer Industry data for the specific farmer
    const totalIndustries = await FarmerIndustry.countDocuments({
      farmer_id: farmerId,
    });

    const from = (page - 1) * industriesPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + industriesPerPage - 1, totalIndustries); // Calculate 'to' value

    // Find Farmer Industry data for the specific farmer with pagination
    const farmerIndustryData = await FarmerIndustry.find({
      farmer_id: farmerId,
    })
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(industriesPerPage * (page - 1)) // Skip industries based on the current page
      .limit(industriesPerPage); // Limit the number of industries per page

    const totalPages = Math.ceil(totalIndustries / industriesPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    // Respond with the retrieved data and pagination information
    res.status(200).json({
      farmerIndustryData,
      meta: {
        currentPage: page,
        totalPages,
        totalIndustries,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Farmer Industry data for all farmers (admin-only)
const getAllFarmerIndustriesForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const industriesPerPage = 10; // Number of industries per page

    // Get the total number of Farmer Industry data
    const totalIndustries = await FarmerIndustry.countDocuments();

    const from = (page - 1) * industriesPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + industriesPerPage - 1, totalIndustries); // Calculate 'to' value

    // Find all Farmer Industry data with pagination
    const farmerIndustryData = await FarmerIndustry.find()
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(industriesPerPage * (page - 1)) // Skip industries based on the current page
      .limit(industriesPerPage); // Limit the number of industries per page

    const totalPages = Math.ceil(totalIndustries / industriesPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    // Respond with the retrieved data and pagination information
    res.status(200).json({
      farmerIndustryData,
      meta: {
        currentPage: page,
        totalPages,
        totalIndustries,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleIndustryForUser = async (req, res) => {
  try {
    const { userId, industryId } = req.params;

    // Find the user with the provided ID
    const user = await User.findById(userId);

    // Check if the user exists and has the role "farmer" or "admin"
    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const industry = await FarmerIndustry.findOne({
      _id: industryId,
      farmer_id: userId,
    });

    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    res.status(200).json({ industry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteIndustry = async (req, res) => {
  try {
    const { userId, industryId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedIndustry = await FarmerIndustry.findOneAndDelete({
      _id: industryId,
      farmer_id: userId,
    });

    if (!deletedIndustry) {
      return res.status(404).json({ error: "Industry not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          industries: {
            _id: industryId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Industry deleted successfully",
      deletedIndustry,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editIndustry = async (req, res) => {
  try {
    const { userId, industryId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }
    const industry = await FarmerIndustry.findOne({
      _id: industryId,
      farmer_id: userId,
    });
    if (!industry) {
      return res.status(404).json({ error: "Industry not found" });
    }
    const {
      farm_name,
      farm_size,
      type_of_farming,
      irrigation_methods_used,
      years_in_farming,
      crops_details,
      any_challenge,
      tools_needed,
      sustainable_practices,
      certifications,
      marketing_strategies,
      local_farming_associations,
      farm_contact,
      farm_address_street,
      farm_address_city,
      farm_address_state,
      farm_address_country,
      farm_address_postalCode,
      farm_image,
      farm_thumbnail,
    } = req.body;

    industry.farm_name = farm_name;
    industry.farm_size = farm_size;
    industry.type_of_farming = type_of_farming;
    industry.irrigation_methods_used = irrigation_methods_used;
    industry.years_in_farming = years_in_farming;
    industry.crops_details = crops_details;
    industry.any_challenge = any_challenge;
    industry.tools_needed = tools_needed;
    industry.sustainable_practices = sustainable_practices;
    industry.certifications = certifications;
    industry.marketing_strategies = marketing_strategies;
    industry.local_farming_associations = local_farming_associations;
    industry.farm_contact = farm_contact;
    industry.farm_address_street = farm_address_street;
    industry.farm_address_city = farm_address_city;
    industry.farm_address_state = farm_address_state;
    industry.farm_address_country = farm_address_country;
    industry.farm_address_postalCode = farm_address_postalCode;
    industry.farm_image = farm_image;
    industry.farm_thumbnail = farm_thumbnail;

    const updatedIndustry = await industry.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "industries._id": industryId },
      {
        $set: {
          "industries.$.name": farm_name,
          "industries.$.details": crops_details,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Industry updated successfully",
      updatedIndustry,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addFarmerIndustryData,
  getAllFarmerIndustryData,
  getAllFarmerIndustriesForAdmin,
  getSingleIndustryForUser,
  deleteIndustry,
  editIndustry,
};
