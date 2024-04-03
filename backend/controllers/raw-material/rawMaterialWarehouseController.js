const RawMaterialWarehouse = require("../../models/raw-material/rawMaterialWarehouseModel");
const User = require("../../models/userModel");

const addRawMaterialWarehouseData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const user = await User.findById(farmerId);

    // Check if the user with the provided ID exists and has the role "farmer" or "admin"
    if (!user || (user.role !== "rawMaterial" && user.role !== "admin")) {
      return res
        .status(403) 
        .json({
          error: "Unauthorized. User is not a raw material farmer or admin.",
        });
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
      transportation_partner,
      products,
    } = req.body;

    // Create a new instance of the Raw Material Warehouse model
    const newRawMaterialWarehouse = new RawMaterialWarehouse({
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
      transportation_partner,
      products,
    });

    // Save the new Raw Material Warehouse data
    const rawMaterialWarehouse = await newRawMaterialWarehouse.save();

    // Update the user's industries array with the new raw material warehouse
    user.industries.push({
      _id: rawMaterialWarehouse._id,
      name: farm_name,
    });

    const updatedUser = await user.save();

    // Respond with a success message
    res.status(201).json({
      message: "Raw Material Warehouse added successfully",
      rawMaterialWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Raw Material Warehouse data for a specific farmer
const getAllRawMaterialWarehouseData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const warehousesPerPage = 10;

    const totalWarehouses = await RawMaterialWarehouse.countDocuments({
      farmer_id: farmerId,
    });

    const from = (page - 1) * warehousesPerPage + 1;
    const to = Math.min(from + warehousesPerPage - 1, totalWarehouses);

    const rawMaterialWarehouseData = await RawMaterialWarehouse.find({
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
      rawMaterialWarehouseData,
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

// Controller to get all Raw Material Warehouse data for all farmers (admin-only)
const getAllRawMaterialWarehousesForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const warehousesPerPage = 10;

    const totalWarehouses = await RawMaterialWarehouse.countDocuments();

    const from = (page - 1) * warehousesPerPage + 1;
    const to = Math.min(from + warehousesPerPage - 1, totalWarehouses);

    const rawMaterialWarehouseData = await RawMaterialWarehouse.find()
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
      rawMaterialWarehouseData,
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

const getSingleRawMaterialWarehouseForUser = async (req, res) => {
  try {
    const { userId, warehouseId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const warehouse = await RawMaterialWarehouse.findOne({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!warehouse) {
      return res
        .status(404)
        .json({ error: "Raw Material Warehouse not found" });
    }

    res.status(200).json({ warehouse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRawMaterialWarehouse = async (req, res) => {
  try {
    const { userId, warehouseId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedWarehouse = await RawMaterialWarehouse.findOneAndDelete({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!deletedWarehouse) {
      return res
        .status(404)
        .json({ error: "Raw Material Warehouse not found" });
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
      message: "Raw Material Warehouse deleted successfully",
      deletedWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editRawMaterialWarehouse = async (req, res) => {
  try {
    const { userId, warehouseId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User is not exist." });
    }

    const warehouse = await RawMaterialWarehouse.findOne({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!warehouse) {
      return res
        .status(404)
        .json({ error: "Raw Material Warehouse not found" });
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
      message: "Raw Material Warehouse updated successfully",
      updatedWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addRawMaterialWarehouseData,
  getAllRawMaterialWarehouseData,
  getAllRawMaterialWarehousesForAdmin,
  getSingleRawMaterialWarehouseForUser,
  deleteRawMaterialWarehouse,
  editRawMaterialWarehouse,
};
