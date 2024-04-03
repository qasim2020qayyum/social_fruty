const Landbroker = require("../../models/land-broker/LandbrokerModel");
const User = require("../../models/userModel");

const addLandbrokerData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const user = await User.findById(farmerId);

    // Check if the user with the provided ID exists and has the role "farmer" or "admin"
    if (!user || (user.role !== "landBrokers" && user.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Unauthorized. User is not a landbroker or admin." });
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
      products,
    } = req.body;

    // Create a new instance of the Landbroker model
    const newLandbroker = new Landbroker({
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
      products,
    });

    // Save the new Landbroker data
    const landbroker = await newLandbroker.save();

    // Update the user's industries array with the new landbroker
    user.industries.push({
      _id: landbroker._id,
      name: farm_name,
    });

    const updatedUser = await user.save();

    // Respond with a success message
    res.status(201).json({
      message: "Landbroker added successfully",
      landbroker,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Landbroker data for a specific farmer
const getAllLandbrokerData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const brokersPerPage = 10;

    const totalBrokers = await Landbroker.countDocuments({
      farmer_id: farmerId,
    });

    const from = (page - 1) * brokersPerPage + 1;
    const to = Math.min(from + brokersPerPage - 1, totalBrokers);

    const landbrokerData = await Landbroker.find({
      farmer_id: farmerId,
    })
      .sort({ updatedAt: -1 })
      .skip(brokersPerPage * (page - 1))
      .limit(brokersPerPage);

    const totalPages = Math.ceil(totalBrokers / brokersPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      landbrokerData,
      meta: {
        currentPage: page,
        totalPages,
        totalBrokers,
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

// Controller to get all Landbroker data for all farmers (admin-only)
const getAllLandbrokersForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const brokersPerPage = 10;

    const totalBrokers = await Landbroker.countDocuments();

    const from = (page - 1) * brokersPerPage + 1;
    const to = Math.min(from + brokersPerPage - 1, totalBrokers);

    const landbrokerData = await Landbroker.find()
      .sort({ updatedAt: -1 })
      .skip(brokersPerPage * (page - 1))
      .limit(brokersPerPage);

    const totalPages = Math.ceil(totalBrokers / brokersPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      landbrokerData,
      meta: {
        currentPage: page,
        totalPages,
        totalBrokers,
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

const getSingleLandbrokerForUser = async (req, res) => {
  try {
    const { userId, brokerId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const broker = await Landbroker.findOne({
      _id: brokerId,
      farmer_id: userId,
    });

    if (!broker) {
      return res.status(404).json({ error: "Landbroker not found" });
    }

    res.status(200).json({ broker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteLandbroker = async (req, res) => {
  try {
    const { userId, brokerId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedBroker = await Landbroker.findOneAndDelete({
      _id: brokerId,
      farmer_id: userId,
    });
 
    if (!deletedBroker) {
      return res.status(404).json({ error: "Landbroker not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          industries: {
            _id: brokerId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Landbroker deleted successfully",
      deletedBroker,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editLandbroker = async (req, res) => {
  try {
    const { userId, brokerId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const broker = await Landbroker.findOne({
      _id: brokerId,
      farmer_id: userId,
    });

    if (!broker) {
      return res.status(404).json({ error: "Landbroker not found" });
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
      products,
    } = req.body;

    broker.farm_name = farm_name;
    broker.street = street;
    broker.city = city;
    broker.state = state;
    broker.country = country;
    broker.postalCode = postalCode;
    broker.contact = contact;
    broker.email = email;
    broker.products = products;

    const updatedBroker = await broker.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "industries._id": brokerId },
      {
        $set: {
          "industries.$.name": farm_name,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Landbroker updated successfully",
      updatedBroker,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addLandbrokerData,
  getAllLandbrokerData,
  getAllLandbrokersForAdmin,
  getSingleLandbrokerForUser,
  deleteLandbroker,
  editLandbroker,
};
