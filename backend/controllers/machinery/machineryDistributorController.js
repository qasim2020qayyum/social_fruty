const MachineryDistributor = require("../../models/machinery/MachineryDistributorModel");
const User = require("../../models/userModel");

// Controller to add data to Machinery Distributor
const addMachineryDistributorData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const user = await User.findById(farmerId);

    // Check if the user with the provided ID exists and has the role "farmer" or "admin"
    if (!user || (user.role !== "machinery" && user.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Unauthorized. User is not a machinery or admin." });
    }

    const {
      farm_name,
      street,
      city,
      state,
      country,
      postalCode,
      contact,
      email,
      certifications_and_licence_details,
      machinery_details,
      marketing_strategies,
    } = req.body;

    // Create a new instance of the Machinery Distributor model
    const newMachineryDistributor = new MachineryDistributor({
      farmer_id: farmerId,
      farmer_name: user.name,
      farmer_email: user.email,
      farm_name,
      street,
      city,
      state,
      country,
      postalCode,
      contact,
      email,
      certifications_and_licence_details,
      machinery_details,
      marketing_strategies,
    });

    // Save the new Machinery Distributor data
    const machineryDistributor = await newMachineryDistributor.save();

    // Update the user's industries array with the new machinery distributor
    user.industries.push({
      _id: machineryDistributor._id,
      name: farm_name,
      details: machinery_details,
    });

    const updatedUser = await user.save();

    // Respond with a success message
    res.status(201).json({
      message: "Machinery Distributor added successfully",
      machineryDistributor,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Machinery Distributor data for a specific farmer
const getAllMachineryDistributorData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const distributorsPerPage = 10;

    const totalIndustries = await MachineryDistributor.countDocuments({
      farmer_id: farmerId,
    });

    const from = (page - 1) * distributorsPerPage + 1;
    const to = Math.min(from + distributorsPerPage - 1, totalIndustries);

    const machineryDistributorData = await MachineryDistributor.find({
      farmer_id: farmerId,
    })
      .sort({ updatedAt: -1 })
      .skip(distributorsPerPage * (page - 1))
      .limit(distributorsPerPage);

    const totalPages = Math.ceil(totalIndustries / distributorsPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      machineryDistributorData,
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

// Controller to get all Machinery Distributor data for all farmers (admin-only)
const getAllMachineryDistributorsForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const distributorsPerPage = 10;

    const totalDistributors = await MachineryDistributor.countDocuments();

    const from = (page - 1) * distributorsPerPage + 1;
    const to = Math.min(from + distributorsPerPage - 1, totalDistributors);

    const machineryDistributorData = await MachineryDistributor.find()
      .sort({ updatedAt: -1 })
      .skip(distributorsPerPage * (page - 1))
      .limit(distributorsPerPage);

    const totalPages = Math.ceil(totalDistributors / distributorsPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      machineryDistributorData,
      meta: {
        currentPage: page,
        totalPages,
        totalDistributors,
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

const getSingleDistributorForUser = async (req, res) => {
  try {
    const { userId, industryId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const distributor = await MachineryDistributor.findOne({
      _id: industryId,
      farmer_id: userId,
    });

    if (!distributor) {
      return res.status(404).json({ error: "Machinery Distributor not found" });
    }

    res.status(200).json({ distributor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDistributor = async (req, res) => {
  try {
    const { userId, industryId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedDistributor = await MachineryDistributor.findOneAndDelete({
      _id: industryId,
      farmer_id: userId,
    });

    if (!deletedDistributor) {
      return res.status(404).json({ error: "Machinery Distributor not found" });
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
      message: "Machinery Distributor deleted successfully",
      deletedDistributor,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editDistributor = async (req, res) => {
  try {
    const { userId, industryId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const distributor = await MachineryDistributor.findOne({
      _id: industryId,
      farmer_id: userId,
    });

    if (!distributor) {
      return res.status(404).json({ error: "Machinery Distributor not found" });
    }

    const {
      farm_name,
      street,
      city,
      state,
      country,
      postalCode,
      contact,
      email,
      certifications_and_licence_details,
      marketing_strategies,
    } = req.body;

    distributor.farm_name = farm_name;
    distributor.street = street;
    distributor.city = city;
    distributor.state = state;
    distributor.country = country;
    distributor.postalCode = postalCode;
    distributor.contact = contact;
    distributor.email = email;
    distributor.certifications_and_licence_details =
      certifications_and_licence_details;
    distributor.marketing_strategies = marketing_strategies;

    const updatedDistributor = await distributor.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "industries._id": industryId },
      {
        $set: {
          "industries.$.name": farm_name,
          // "industries.$.details": machinery_details,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Machinery Distributor updated successfully",
      updatedDistributor,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addMachineryDistributorData,
  getAllMachineryDistributorData,
  getAllMachineryDistributorsForAdmin,
  getSingleDistributorForUser,
  deleteDistributor,
  editDistributor,
};
