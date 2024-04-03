const Transport = require("../../models/transport/transportModel");
const User = require("../../models/userModel");

const addTransportData = async (req, res) => {
  try { 
    const { farmerId } = req.params;
    const user = await User.findById(farmerId);

    // Check if the user with the provided ID exists and has the role "transport" or "admin"
    if (!user || (user.role !== "transport" && user.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Unauthorized. User is not a transport or admin." });
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
      types_of_transportation,
      coverage_area,
      service_hours_in_country,
      service_hours_out_of_country,
      insurance_coverage_offered,
      products,
    } = req.body;

    // Create a new instance of the Transport model
    const newTransport = new Transport({
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
      types_of_transportation,
      coverage_area,
      service_hours_in_country,
      service_hours_out_of_country,
      insurance_coverage_offered,
      products,
    });

    // Save the new Transport data
    const transport = await newTransport.save();

    // Update the user's industries array with the new transport
    user.industries.push({
      _id: transport._id,
      name: farm_name,
      details: types_of_transportation,
    });

    const updatedUser = await user.save();

    // Respond with a success message
    res.status(201).json({
      message: "Transport added successfully",
      transport,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Transport data for a specific farmer
const getAllTransportData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const transportsPerPage = 10;

    const totalTransports = await Transport.countDocuments({
      farmer_id: farmerId,
    });

    const from = (page - 1) * transportsPerPage + 1;
    const to = Math.min(from + transportsPerPage - 1, totalTransports);

    const transportData = await Transport.find({
      farmer_id: farmerId,
    })
      .sort({ updatedAt: -1 })
      .skip(transportsPerPage * (page - 1))
      .limit(transportsPerPage);

    const totalPages = Math.ceil(totalTransports / transportsPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      transportData,
      meta: {
        currentPage: page,
        totalPages,
        totalTransports,
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

// Controller to get all Transport data for all farmers (admin-only)
const getAllTransportsForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const transportsPerPage = 10;

    const totalTransports = await Transport.countDocuments();

    const from = (page - 1) * transportsPerPage + 1;
    const to = Math.min(from + transportsPerPage - 1, totalTransports);

    const transportData = await Transport.find()
      .sort({ updatedAt: -1 })
      .skip(transportsPerPage * (page - 1))
      .limit(transportsPerPage);

    const totalPages = Math.ceil(totalTransports / transportsPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      transportData,
      meta: {
        currentPage: page,
        totalPages,
        totalTransports,
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

const getSingleTransportForUser = async (req, res) => {
  try {
    const { userId, transportId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const transport = await Transport.findOne({
      _id: transportId,
      farmer_id: userId,
    });

    if (!transport) {
      return res.status(404).json({ error: "Transport not found" });
    }

    res.status(200).json({ transport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteTransport = async (req, res) => {
  try {
    const { userId, transportId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedTransport = await Transport.findOneAndDelete({
      _id: transportId,
      farmer_id: userId,
    });

    if (!deletedTransport) {
      return res.status(404).json({ error: "Transport not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          industries: {
            _id: transportId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Transport deleted successfully",
      deletedTransport,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editTransport = async (req, res) => {
  try {
    const { userId, transportId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const transport = await Transport.findOne({
      _id: transportId,
      farmer_id: userId,
    });

    if (!transport) {
      return res.status(404).json({ error: "Transport not found" });
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
      types_of_transportation,
      coverage_area,
      service_hours_in_country,
      service_hours_out_of_country,
      insurance_coverage_offered,
      products,
    } = req.body;

    transport.farm_name = farm_name;
    transport.street = street;
    transport.city = city;
    transport.state = state;
    transport.country = country;
    transport.postalCode = postalCode;
    transport.contact = contact;
    transport.email = email;
    transport.types_of_transportation = types_of_transportation;
    transport.coverage_area = coverage_area;
    transport.service_hours_in_country = service_hours_in_country;
    transport.service_hours_out_of_country = service_hours_out_of_country;
    transport.insurance_coverage_offered = insurance_coverage_offered;
    transport.products = products;

    const updatedTransport = await transport.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "industries._id": transportId },
      {
        $set: {
          "industries.$.name": farm_name,
          "industries.$.details": types_of_transportation,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Transport updated successfully",
      updatedTransport,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addTransportData,
  getAllTransportData,
  getAllTransportsForAdmin,
  getSingleTransportForUser,
  deleteTransport,
  editTransport,
};
