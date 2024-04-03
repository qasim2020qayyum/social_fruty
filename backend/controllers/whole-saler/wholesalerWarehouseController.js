const WholesalerWarehouse = require("../../models/whole-saler/wholesalerWarehouseModel");
const User = require("../../models/userModel");

const addWholesalerWarehouseData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const user = await User.findById(farmerId);

    // Check if the user with the provided ID exists and has the role "farmer" or "admin"
    if (!user || (user.role !== "wholesaler" && user.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Unauthorized. User is not a wholesaler or admin." });
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
      sales_channel,
      transportation_partner,
      products,
    } = req.body;

    // Create a new instance of the Wholesaler Warehouse model
    const newWholesalerWarehouse = new WholesalerWarehouse({
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
      sales_channel,
      transportation_partner,
      products,
    });

    // Save the new Wholesaler Warehouse data
    const wholesalerWarehouse = await newWholesalerWarehouse.save();

    // Update the user's industries array with the new wholesaler warehouse
    user.industries.push({
      _id: wholesalerWarehouse._id,
      name: farm_name,
    });
    const updatedUser = await user.save();
    // Respond with a success message
    res.status(201).json({
      message: "Wholesaler Warehouse added successfully",
      wholesalerWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all Wholesaler Warehouse data for a specific farmer
const getAllWholesalerWarehouseData = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const warehousesPerPage = 10;

    const totalWarehouses = await WholesalerWarehouse.countDocuments({
      farmer_id: farmerId,
    });

    const from = (page - 1) * warehousesPerPage + 1;
    const to = Math.min(from + warehousesPerPage - 1, totalWarehouses);

    const wholesalerWarehouseData = await WholesalerWarehouse.find({
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
      wholesalerWarehouseData,
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

// Controller to get all Wholesaler Warehouse data for all farmers (admin-only)
const getAllWholesalerWarehousesForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const warehousesPerPage = 10;

    const totalWarehouses = await WholesalerWarehouse.countDocuments();

    const from = (page - 1) * warehousesPerPage + 1;
    const to = Math.min(from + warehousesPerPage - 1, totalWarehouses);

    const wholesalerWarehouseData = await WholesalerWarehouse.find()
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
      wholesalerWarehouseData,
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

    const warehouse = await WholesalerWarehouse.findOne({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!warehouse) {
      return res.status(404).json({ error: "Wholesaler Warehouse not found" });
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

    const deletedWarehouse = await WholesalerWarehouse.findOneAndDelete({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!deletedWarehouse) {
      return res.status(404).json({ error: "Wholesaler Warehouse not found" });
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
      message: "Wholesaler Warehouse deleted successfully",
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

    const warehouse = await WholesalerWarehouse.findOne({
      _id: warehouseId,
      farmer_id: userId,
    });

    if (!warehouse) {
      return res.status(404).json({ error: "Wholesaler Warehouse not found" });
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
      sales_channel,
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
    warehouse.sales_channel = sales_channel;
    warehouse.transportation_partner = transportation_partner;
    warehouse.products = products;

    const updatedWarehouse = await warehouse.save();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "industries._id": warehouseId },
      {
        $set: {
          "industries.$.name": farm_name,
          "industries.$.details": products,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Wholesaler Warehouse updated successfully",
      updatedWarehouse,
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addWholesalerWarehouseData,
  getAllWholesalerWarehouseData,
  getAllWholesalerWarehousesForAdmin,
  getSingleWarehouseForUser,
  deleteWarehouse,
  editWarehouse,
};
