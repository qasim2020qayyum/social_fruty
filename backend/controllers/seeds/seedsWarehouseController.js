const SeedsWarehouse = require("../../models/seeds/seedsWarehouseModel");
const User = require("../../models/userModel");

const addSeedsWarehouseData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const user = await User.findById(farmerId);

    // Check if the user with the provided ID exists and has the role "farmer" or "admin"
    if (!user || (user.role !== "seeds" && user.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Unauthorized. User is not a seeds distributor or admin." });
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
      marketing_strategies,
      areas_covered,
      research_partners,
      any_wholesaler,
      transportation_partner,
      products,
    } = req.body;

    // Create a new instance of the Seeds Warehouse model
    const newSeedsWarehouse = new SeedsWarehouse({
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
      marketing_strategies,
      areas_covered,
      research_partners,
      any_wholesaler,
      transportation_partner,
      products,
    });

    // Save the new Seeds Warehouse data
    const seedsWarehouse = await newSeedsWarehouse.save();

    // Update the user's industries array with the new seeds warehouse
    user.industries.push({
      _id: seedsWarehouse._id,
      name: farm_name,
    });

    const updatedUser = await user.save();

    // Respond with a success message
    res.status(201).json({
      message: "Seeds Warehouse added successfully",
      seedsWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Seeds Warehouse data for a specific farmer
const getAllSeedsWarehouseData = async (req, res) => {
  try { 
    const { farmerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const warehousesPerPage = 10;

    const totalWarehouses = await SeedsWarehouse.countDocuments({
      farmer_id: farmerId,
    });

    const from = (page - 1) * warehousesPerPage + 1;
    const to = Math.min(from + warehousesPerPage - 1, totalWarehouses);

    const seedsWarehouseData = await SeedsWarehouse.find({
      farmer_id: farmerId,
    })
      .sort({ updatedAt: -1 })
      .skip(warehousesPerPage * (page - 1))
      .limit(warehousesPerPage);

    const totalPages = Math.ceil(totalWarehouses / warehousesPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      seedsWarehouseData,
      meta: {
        currentPage: page,
        totalPages,
        totalWarehouses,
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

// Controller to get all Seeds Warehouse data for all farmers (admin-only)
const getAllSeedsWarehousesForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const warehousesPerPage = 10;

    const totalWarehouses = await SeedsWarehouse.countDocuments();

    const from = (page - 1) * warehousesPerPage + 1;
    const to = Math.min(from + warehousesPerPage - 1, totalWarehouses);

    const seedsWarehouseData = await SeedsWarehouse.find()
      .sort({ updatedAt: -1 })
      .skip(warehousesPerPage * (page - 1))
      .limit(warehousesPerPage);

    const totalPages = Math.ceil(totalWarehouses / warehousesPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      seedsWarehouseData,
      meta: {
        currentPage: page,
        totalPages,
        totalWarehouses,
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

const getSingleWarehouseForUser = async (req, res) => {
  try {
    const { userId, warehouseId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const warehouse = await SeedsWarehouse.findOne({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!warehouse) {
      return res.status(404).json({ error: "Seeds Warehouse not found" });
    }

    res.status(200).json({ warehouse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const { userId, warehouseId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedWarehouse = await SeedsWarehouse.findOneAndDelete({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!deletedWarehouse) {
      return res.status(404).json({ error: "Seeds Warehouse not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          industries: {
            _id: warehouseId,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Seeds Warehouse deleted successfully",
      deletedWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editWarehouse = async (req, res) => {
  try {
    const { userId, warehouseId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const warehouse = await SeedsWarehouse.findOne({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!warehouse) {
      return res.status(404).json({ error: "Seeds Warehouse not found" });
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
      marketing_strategies,
      areas_covered,
      research_partners,
      any_wholesaler,
      transportation_partner,
      products,
    } = req.body;

    warehouse.farm_name = farm_name;
    warehouse.street = street;
    warehouse.city = city;
    warehouse.state = state;
    warehouse.country = country;
    warehouse.postalCode = postalCode;
    warehouse.contact = contact;
    warehouse.email = email;
    warehouse.marketing_strategies = marketing_strategies;
    warehouse.areas_covered = areas_covered;
    warehouse.research_partners = research_partners;
    warehouse.any_wholesaler = any_wholesaler;
    warehouse.transportation_partner = transportation_partner;
    warehouse.products = products;

    const updatedWarehouse = await warehouse.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "industries._id": warehouseId },
      {
        $set: {
          "industries.$.name": farm_name,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Seeds Warehouse updated successfully",
      updatedWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  addSeedsWarehouseData,
  getAllSeedsWarehouseData,
  getAllSeedsWarehousesForAdmin,
  getSingleWarehouseForUser,
  deleteWarehouse,
  editWarehouse,
};
