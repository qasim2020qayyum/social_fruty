// const dirname = require('../../uploads')
const MachineryProduct = require("../../models/machinery/machineryModel");
const MachineryWarehouse = require("../../models/machinery/MachineryDistributorModel");
const { processFile, deleteFile } = require("../../helper/helper");

const processSingleImage = async (image, payloadField) => {
  if (image) {
    const thumbnailpic = await processFile(image);
    return thumbnailpic?.name;
  } else {
    return "";
  }
}; 

const processImageFields = async (req, payload) => {
  payload.image = await processSingleImage(req?.files.image, "image");
  payload.image2 = await processSingleImage(req?.files.image2, "image2");
  payload.image3 = await processSingleImage(req?.files.image3, "image3");
  payload.image4 = await processSingleImage(req?.files.image4, "image4");
};

const addNewMachineryDistributorData = async (req, res) => {
  try {
    const { machineryDistributorId } = req.params;
    const machineryWarehouse = await MachineryWarehouse.findById(machineryDistributorId);
    if (!machineryWarehouse) {
      return res.status(403).json({ error: "Machinery Warehouse do not exist" });
    }
    const payload = req.body;
    await processImageFields(req, payload);
    payload.farmer_id = machineryWarehouse.farmer_id;
    payload.farmer_name = machineryWarehouse.farmer_name;
    payload.farm_name = machineryWarehouse.farm_name;
    payload.farm_id = machineryWarehouse._id;

    // Check if there is a discount, and calculate the after_discount price
    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }
    const newMachineryWarehouse = new MachineryProduct(payload);
    const product = await newMachineryWarehouse.save();
    machineryWarehouse.products.push(product);
    const updatedMachineryWarehouse = await machineryWarehouse.save();
    res.status(201).json({
      message: "Machinery product added successfully",
      product,
      updatedMachineryWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 12;

    const totalProducts = await MachineryProduct.countDocuments();

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await MachineryProduct.find()
      .sort({ updatedAt: -1 })
      .skip(productsPerPage * (page - 1))
      .limit(productsPerPage);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      products,
      meta: {
        currentPage: page,
        totalPages,
        totalProducts,
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

const getAllMachineryProducts = async (req, res) => {
  try {
    const { machineryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 12;

    const totalProducts = await MachineryProduct.countDocuments({
      farmer_id: machineryId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await MachineryProduct.find({
      farmer_id: machineryId,
    })
      .sort({ updatedAt: -1 })
      .skip(productsPerPage * (page - 1))
      .limit(productsPerPage);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      products,
      meta: {
        currentPage: page,
        totalPages,
        totalProducts,
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
const getAllNewMachineryData = async (req, res) => {
  try {
    const { machineryDistributorId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await MachineryProduct.countDocuments({
      farm_id: machineryDistributorId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await MachineryProduct.find({
      farm_id: machineryDistributorId,
    })
      .sort({ updatedAt: -1 })
      .skip(productsPerPage * (page - 1))
      .limit(productsPerPage);

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      products,
      meta: {
        currentPage: page,
        totalPages,
        totalProducts,
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

const getAllMachineryForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 10;

    const totalproducts = await MachineryProduct.countDocuments();

    const from = (page - 1) * productPerPage + 1;
    const to = Math.min(from + productPerPage - 1, totalproducts);

    const productData = await MachineryProduct.find()
      .sort({ updatedAt: -1 })
      .skip(productPerPage * (page - 1))
      .limit(productPerPage);

    const totalPages = Math.ceil(totalproducts / productPerPage);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      productData,
      meta: {
        currentPage: page,
        totalPages,
        totalproducts,
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

const deleteMachinery = async (req, res) => {
  try { 
    const { machineryId } = req.params;
    const product = await MachineryProduct.findById(machineryId);
    if (!product) {
      return res.status(404).json({ error: "Machinery Product not found" });
    }
    if (product.image) {
      await deleteFile(product.image);
    }
    if (product.image2) {
      await deleteFile(product.image2);
    }
    if (product.image3) {
      await deleteFile(product.image3);
    }
    if (product.image4) {
      await deleteFile(product.image4);
    }

    const deletedMachineryProduct = await MachineryProduct.findOneAndDelete({
      _id: machineryId,
    });

    if (!deletedMachineryProduct) {
      return res.status(404).json({ error: "Machinery Product not found" });
    }

    const updatedMachineryWarehouse = await MachineryWarehouse.findByIdAndUpdate(
      { _id: deletedMachineryProduct.farm_id },
      {
        $pull: {
          products: {
            _id: deletedMachineryProduct._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Machinery Product deleted successfully",
      deletedMachineryProduct,
      updatedMachineryWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleMachinery = async (req, res) => {
  try {
    const { machineryId } = req.params;
    const product = await MachineryProduct.findOne({
      _id: machineryId,
    });
    if (!product) {
      return res.status(404).json({ error: "Machinery Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const processAndDeleteImage = async (image, existingImage, field, payload) => {
  if (image) {
    if (existingImage) {
      await deleteFile(existingImage);
    }
    const uploadedImage = await processFile(image);
    if (uploadedImage) {
      payload[field] = uploadedImage.name;
    }
  } else {
    if (existingImage) {
      await deleteFile(existingImage);
    }
  }
};

const updateImageFields = async (req, machineryProduct, payload) => {
  const { image, image2, image3, image4 } = req?.files;
  await processAndDeleteImage(image, machineryProduct.image, "image", payload);
  await processAndDeleteImage(image2, machineryProduct.image2, "image2", payload);
  await processAndDeleteImage(image3, machineryProduct.image3, "image3", payload);
  await processAndDeleteImage(image4, machineryProduct.image4, "image4", payload);
};

const updateMachinery = async (req, res) => {
  try {
    const { machineryId } = req.params;

    const machineryProduct = await MachineryProduct.findOne({
      _id: machineryId,
    }); 

    if (!machineryProduct) {
      return res.status(404).json({ error: "Machinery Product not found" });
    }

    const machineryWarehouse = await MachineryWarehouse.findById(machineryProduct.farm_id);

    if (!machineryWarehouse) {
      return res.status(404).json({ error: "Machinery Warehouse is not exist." });
    }

    const payload = req.body;

    await updateImageFields(req, machineryProduct, payload);

    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }

    // Update machinery Product
    const updatedMachineryProduct = await MachineryProduct.findOneAndUpdate(
      {
        _id: machineryId,
      },
      {
        $set: payload,
      },
      { new: true }
    );

    if (!updatedMachineryProduct) {
      return res.status(404).json({ error: "Machinery Product not found" });
    }

    const previousMachineryWarehouse = await MachineryWarehouse.findByIdAndUpdate(
      { _id: updatedMachineryProduct.farm_id },
      {
        $pull: {
          products: {
            _id: updatedMachineryProduct._id,
          },
        },
      },
      { new: true }
    );
    if (previousMachineryWarehouse) {
      machineryWarehouse.products.push(updatedMachineryProduct);
    }
    const updatedMachineryWarehouse = await machineryWarehouse.save();

    res.status(200).json({
      message: "Machinery Product and Machinery Warehouse updated successfully",
      updatedMachineryProduct,
      updatedMachineryWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addNewMachineryDistributorData,
  getAllNewMachineryData,
  getAllMachineryForAdmin,
  deleteMachinery,
  getSingleMachinery,
  updateMachinery,
  getProducts,
  getAllMachineryProducts
};
