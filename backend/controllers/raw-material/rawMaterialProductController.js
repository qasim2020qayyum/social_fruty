// const dirname = require('../../uploads')
const RawMaterialProduct = require("../../models/raw-material/rawMaterialProductModel");
const RawMaterialWarehouse = require("../../models/raw-material/rawMaterialWarehouseModel");
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

const addRawMaterialProductData = async (req, res) => {
  try {
    const { rawMaterialWarehouseId } = req.params;
    const rawMaterialWarehouse = await RawMaterialWarehouse.findById(rawMaterialWarehouseId);
    if (!rawMaterialWarehouse) {
      return res.status(403).json({ error: "RawMaterial Warehouse do not exist" });
    }
    const payload = req.body;
    await processImageFields(req, payload);
    payload.farmer_id = rawMaterialWarehouse.farmer_id;
    payload.farmer_name = rawMaterialWarehouse.farmer_name;
    payload.farm_name = rawMaterialWarehouse.farm_name;
    payload.farm_id = rawMaterialWarehouse._id;

    // Check if there is a discount, and calculate the after_discount price
    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }
    const newRawMaterialWarehouse = new RawMaterialProduct(payload);
    const product = await newRawMaterialWarehouse.save();
    rawMaterialWarehouse.products.push(product);
    const updatedRawMaterialWarehouse = await rawMaterialWarehouse.save();
    res.status(201).json({
      message: "RawMaterial product added successfully",
      product,
      updatedRawMaterialWarehouse,
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

    const totalProducts = await RawMaterialProduct.countDocuments();

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await RawMaterialProduct.find()
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

const getAllRawMaterialProducts = async (req, res) => {
  try {
    const { rawMaterialWarehouseId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await RawMaterialProduct.countDocuments({
      farm_id: rawMaterialWarehouseId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await RawMaterialProduct.find({
      farm_id: rawMaterialWarehouseId,
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
const getAllRawMaterialProductsByUser = async (req, res) => {
  try {
    const { rawMaterial } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 12;

    const totalProducts = await RawMaterialProduct.countDocuments({
      farmer_id: rawMaterial,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await RawMaterialProduct.find({
      farmer_id: rawMaterial,
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

const getAllRawMaterialProductForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 10;

    const totalproducts = await RawMaterialProduct.countDocuments();

    const from = (page - 1) * productPerPage + 1;
    const to = Math.min(from + productPerPage - 1, totalproducts);

    const productData = await RawMaterialProduct.find()
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

const deleteRawMaterialProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await RawMaterialProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "RawMaterial Product not found" });
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

    const deletedRawMaterialProduct = await RawMaterialProduct.findOneAndDelete({
      _id: productId,
    });

    if (!deletedRawMaterialProduct) {
      return res.status(404).json({ error: "RawMaterial Product not found" });
    }

    const updatedRawMaterialWarehouse = await RawMaterialWarehouse.findByIdAndUpdate(
      { _id: deletedRawMaterialProduct.farm_id },
      {
        $pull: {
          products: {
            _id: deletedRawMaterialProduct._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "RawMaterial Product deleted successfully",
      deletedRawMaterialProduct,
      updatedRawMaterialWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleRawMaterialProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await RawMaterialProduct.findOne({
      _id: productId,
    });
    if (!product) {
      return res.status(404).json({ error: "RawMaterial Product not found" });
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

const updateImageFields = async (req, rawMaterialProduct, payload) => {
  const { image, image2, image3, image4 } = req?.files;
  await processAndDeleteImage(image, rawMaterialProduct.image, "image", payload);
  await processAndDeleteImage(image2, rawMaterialProduct.image2, "image2", payload);
  await processAndDeleteImage(image3, rawMaterialProduct.image3, "image3", payload);
  await processAndDeleteImage(image4, rawMaterialProduct.image4, "image4", payload);
};

const updateRawMaterialProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const rawMaterialProduct = await RawMaterialProduct.findOne({
      _id: productId,
    });

    if (!rawMaterialProduct) {
      return res.status(404).json({ error: "RawMaterial Product not found" });
    }

    const rawMaterialWarehouse = await RawMaterialWarehouse.findById(rawMaterialProduct.farm_id);

    if (!rawMaterialWarehouse) {
      return res.status(404).json({ error: "RawMaterial Warehouse is not exist." });
    }

    const payload = req.body;

    await updateImageFields(req, rawMaterialProduct, payload);

    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }

    // Update RawMaterial Product
    const updatedRawMaterialProduct = await RawMaterialProduct.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: payload,
      },
      { new: true }
    );

    if (!updatedRawMaterialProduct) {
      return res.status(404).json({ error: "RawMaterial Product not found" });
    }

    const previousRawMaterialWarehouse = await RawMaterialWarehouse.findByIdAndUpdate(
      { _id: updatedRawMaterialProduct.farm_id },
      {
        $pull: {
          products: {
            _id: updatedRawMaterialProduct._id,
          },
        },
      },
      { new: true }
    );
    if (previousRawMaterialWarehouse) {
      rawMaterialWarehouse.products.push(updatedRawMaterialProduct);
    }
    const updatedRawMaterialWarehouse = await rawMaterialWarehouse.save();

    res.status(200).json({
      message: "RawMaterial Product and RawMaterial Warehouse updated successfully",
      updatedRawMaterialProduct,
      updatedRawMaterialWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addRawMaterialProductData,
  getAllRawMaterialProducts,
  getAllRawMaterialProductForAdmin,
  deleteRawMaterialProducts,
  getSingleRawMaterialProduct,
  updateRawMaterialProduct,
  getProducts,
  getAllRawMaterialProductsByUser
};
