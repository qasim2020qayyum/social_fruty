// const dirname = require('../../uploads')
const LandbrokerProduct = require("../../models/land-broker/landbrokerProductModel");
const LandBrokerWarehouse = require("../../models/land-broker/LandbrokerModel");
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

const addLandBrokerProductData = async (req, res) => {
  try {
    const { landBrokerWarehouseId } = req.params;
    const landBrokerWarehouse = await LandBrokerWarehouse.findById(landBrokerWarehouseId);
    if (!landBrokerWarehouse) {
      return res.status(403).json({ error: "Land Broker Warehouse do not exist" });
    }
    const payload = req.body;
    await processImageFields(req, payload);
    payload.farmer_id = landBrokerWarehouse.farmer_id;
    payload.farmer_name = landBrokerWarehouse.farmer_name;
    payload.farm_name = landBrokerWarehouse.farm_name;
    payload.farm_id = landBrokerWarehouse._id;

    const newLandBrokerWarehouse = new LandbrokerProduct(payload);
    const product = await newLandBrokerWarehouse.save();
    landBrokerWarehouse.products.push(product);
    const updatedLandBrokerWarehouse = await landBrokerWarehouse.save();
    res.status(201).json({
      message: "Land Broker Product added successfully",
      product,
      updatedLandBrokerWarehouse,
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

    const totalProducts = await LandbrokerProduct.countDocuments();

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await LandbrokerProduct.find()
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

const getLandBrokerProducts = async (req, res) => {
  try {
    const { landBrokerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await LandbrokerProduct.countDocuments({
      farmer_id: landBrokerId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await LandbrokerProduct.find({
      farmer_id: landBrokerId,
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

const getAllLandBrokerProducts = async (req, res) => {
  try {
    const { landBrokerWarehouseId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await LandbrokerProduct.countDocuments({
      farm_id: landBrokerWarehouseId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await LandbrokerProduct.find({
      farm_id: landBrokerWarehouseId,
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

const getAllLandBrokerProductForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 10;

    const totalproducts = await LandbrokerProduct.countDocuments();

    const from = (page - 1) * productPerPage + 1;
    const to = Math.min(from + productPerPage - 1, totalproducts);

    const productData = await LandbrokerProduct.find()
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

const deleteLandBrokerProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await LandbrokerProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Land Broker Product not found" });
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

    const deletedLandbrokerProduct = await LandbrokerProduct.findOneAndDelete({
      _id: productId,
    });

    if (!deletedLandbrokerProduct) {
      return res.status(404).json({ error: "Land Broker Product not found" });
    }

    const updatedLandBrokerWarehouse = await LandBrokerWarehouse.findByIdAndUpdate(
      { _id: deletedLandbrokerProduct.farm_id },
      {
        $pull: {
          products: {
            _id: deletedLandbrokerProduct._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Land Broker Product deleted successfully",
      deletedLandbrokerProduct,
      updatedLandBrokerWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleLandBrokerProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await LandbrokerProduct.findOne({
      _id: productId,
    });
    if (!product) {
      return res.status(404).json({ error: "Land Broker Product not found" });
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

const updateImageFields = async (req, landBrokerProduct, payload) => {
  const { image, image2, image3, image4 } = req?.files;
  await processAndDeleteImage(image, landBrokerProduct.image, "image", payload);
  await processAndDeleteImage(image2, landBrokerProduct.image2, "image2", payload);
  await processAndDeleteImage(image3, landBrokerProduct.image3, "image3", payload);
  await processAndDeleteImage(image4, landBrokerProduct.image4, "image4", payload);
};

const updateLandBrokerProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const landBrokerProduct = await LandbrokerProduct.findOne({
      _id: productId,
    });

    if (!landBrokerProduct) {
      return res.status(404).json({ error: "Land Broker Product not found" });
    }

    const landBrokerWarehouse = await LandBrokerWarehouse.findById(landBrokerProduct.farm_id);

    if (!landBrokerWarehouse) {
      return res.status(404).json({ error: "Land Broker Warehouse is not exist." });
    }

    const payload = req.body;

    await updateImageFields(req, landBrokerProduct, payload);

    // Update Land Broker Product
    const updatedLandBrokerProduct = await LandbrokerProduct.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: payload,
      },
      { new: true }
    );

    if (!updatedLandBrokerProduct) {
      return res.status(404).json({ error: "Land Broker Product not found" });
    }

    const previousLandBrokerWarehouse = await LandBrokerWarehouse.findByIdAndUpdate(
      { _id: updatedLandBrokerProduct.farm_id },
      {
        $pull: {
          products: {
            _id: updatedLandBrokerProduct._id,
          },
        },
      },
      { new: true }
    );
    if (previousLandBrokerWarehouse) {
      landBrokerWarehouse.products.push(updatedLandBrokerProduct);
    }
    const updatedLandBrokerWarehouse = await landBrokerWarehouse.save();

    res.status(200).json({
      message: "Land Broker Product and Land Broker Warehouse updated successfully",
      updatedLandBrokerProduct,
      updatedLandBrokerWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
module.exports = {
  addLandBrokerProductData,
  getAllLandBrokerProducts,
  getAllLandBrokerProductForAdmin,
  deleteLandBrokerProducts,
  getSingleLandBrokerProduct,
  updateLandBrokerProduct,
  getLandBrokerProducts,
  getProducts
};
