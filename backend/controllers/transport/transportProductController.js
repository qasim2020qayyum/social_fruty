// const dirname = require('../../uploads')
const FarmerProduct = require("../../models/transport/transportProductModel");
const Farm = require("../../models/transport/transportModel");
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

const addTransportProductData = async (req, res) => {
  try {
    const { transportWarehouseId } = req.params;
    const farmerFarm = await Farm.findById(transportWarehouseId);
    if (!farmerFarm) {
      return res
        .status(403)
        .json({ error: "Transport Warehouse do not exist" });
    }
    const payload = req.body;
    await processImageFields(req, payload);
    payload.farmer_id = farmerFarm.farmer_id;
    payload.farmer_name = farmerFarm.farmer_name;
    payload.farm_name = farmerFarm.farm_name;
    payload.farm_id = farmerFarm._id;

    const newFarmerIndustry = new FarmerProduct(payload);
    const product = await newFarmerIndustry.save();
    farmerFarm.products.push(product);
    const updatedFarmerFarm = await farmerFarm.save();
    res.status(201).json({
      message: "Transport Product added successfully",
      product,
      updatedFarmerFarm,
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

    const totalProducts = await FarmerProduct.countDocuments();

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await FarmerProduct.find()
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

const getAllTransporterProducts = async (req, res) => {
  try {
    const { transportId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 12;

    const totalProducts = await FarmerProduct.countDocuments({
      farmer_id: transportId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await FarmerProduct.find({
      farmer_id: transportId,
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
const getAllTransportProducts = async (req, res) => {
  try {
    const { transportWarehouseId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await FarmerProduct.countDocuments({
      farm_id: transportWarehouseId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await FarmerProduct.find({
      farm_id: transportWarehouseId,
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

const getAllTransportProductForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 10;

    const totalproducts = await FarmerProduct.countDocuments();

    const from = (page - 1) * productPerPage + 1;
    const to = Math.min(from + productPerPage - 1, totalproducts);

    const productData = await FarmerProduct.find()
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

const deleteTransportProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await FarmerProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Transport Product not found" });
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

    const deletedFarmerProduct = await FarmerProduct.findOneAndDelete({
      _id: productId,
    });

    if (!deletedFarmerProduct) {
      return res.status(404).json({ error: "Transport Product not found" });
    }

    const updatedFarm = await Farm.findByIdAndUpdate(
      { _id: deletedFarmerProduct.farm_id },
      {
        $pull: {
          products: {
            _id: deletedFarmerProduct._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Transport Product deleted successfully",
      deletedFarmerProduct,
      updatedFarm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleTransportProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await FarmerProduct.findOne({
      _id: productId,
    });
    if (!product) {
      return res.status(404).json({ error: "Transport Product not found" });
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

const updateImageFields = async (req, farmerProduct, payload) => {
  const { image, image2, image3, image4 } = req?.files;
  await processAndDeleteImage(image, farmerProduct.image, "image", payload);
  await processAndDeleteImage(image2, farmerProduct.image2, "image2", payload);
  await processAndDeleteImage(image3, farmerProduct.image3, "image3", payload);
  await processAndDeleteImage(image4, farmerProduct.image4, "image4", payload);
};

const updateTransportProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const farmerProduct = await FarmerProduct.findOne({
      _id: productId,
    });

    if (!farmerProduct) {
      return res.status(404).json({ error: "Transport Product not found" });
    }

    const farm = await Farm.findById(farmerProduct.farm_id);

    if (!farm) {
      return res
        .status(404)
        .json({ error: "Transport Warehouse is not exist." });
    }

    const payload = req.body;

    await updateImageFields(req, farmerProduct, payload);

    // Update Farmer Product
    const updatedFarmerProduct = await FarmerProduct.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: payload,
      },
      { new: true }
    );

    if (!updatedFarmerProduct) {
      return res.status(404).json({ error: "Transport Product not found" });
    }

    const previousFarm = await Farm.findByIdAndUpdate(
      { _id: updatedFarmerProduct.farm_id },
      {
        $pull: {
          products: {
            _id: updatedFarmerProduct._id,
          },
        },
      },
      { new: true }
    );
    if (previousFarm) {
      farm.products.push(updatedFarmerProduct);
    }
    const updatedFarm = await farm.save();

    res.status(200).json({
      message: "Transport Product and Transport Warehouse updated successfully",
      updatedFarmerProduct,
      updatedFarm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addTransportProductData,
  getAllTransportProducts,
  getAllTransportProductForAdmin,
  deleteTransportProducts,
  getSingleTransportProduct,
  updateTransportProduct,
  getProducts,
  getAllTransporterProducts
};
