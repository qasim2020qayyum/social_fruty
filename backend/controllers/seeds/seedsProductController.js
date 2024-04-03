// const dirname = require('../../uploads')
const SeedsProduct = require("../../models/seeds/seedsProductModel");
const SeedsWarehouse = require("../../models/seeds/seedsWarehouseModel");
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

const addSeedsProductData = async (req, res) => {
  try {
    const { seedsWarehouseId } = req.params;
    const seedsWarehouse = await SeedsWarehouse.findById(seedsWarehouseId);
    if (!seedsWarehouse) {
      return res.status(403).json({ error: "Seeds Warehouse do not exist" });
    }
    const payload = req.body;
    await processImageFields(req, payload);
    payload.farmer_id = seedsWarehouse.farmer_id;
    payload.farmer_name = seedsWarehouse.farmer_name;
    payload.farm_name = seedsWarehouse.farm_name;
    payload.farm_id = seedsWarehouse._id;

    // Check if there is a discount, and calculate the after_discount price
    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }
    const newSeedsWarehouse = new SeedsProduct(payload);
    const product = await newSeedsWarehouse.save();
    seedsWarehouse.products.push(product);
    const updatedSeedsWarehouse = await seedsWarehouse.save();
    res.status(201).json({
      message: "Seeds product added successfully",
      product,
      updatedSeedsWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSeedsProducts = async (req, res) => {
  try {
    const { seedsWarehouseId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await SeedsProduct.countDocuments({
      farm_id: seedsWarehouseId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await SeedsProduct.find({
      farm_id: seedsWarehouseId,
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

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 12;
    const totalProducts = await SeedsProduct.countDocuments();
    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);
    const products = await SeedsProduct.find()
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

const getSeedsProducts = async (req, res) => {
  try {
    const { seedsUserId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await SeedsProduct.countDocuments({
      farmer_id: seedsUserId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await SeedsProduct.find({
      farmer_id: seedsUserId,
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

const getAllSeedsProductForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 10;

    const totalproducts = await SeedsProduct.countDocuments();

    const from = (page - 1) * productPerPage + 1;
    const to = Math.min(from + productPerPage - 1, totalproducts);

    const productData = await SeedsProduct.find()
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

const deleteSeedsProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await SeedsProduct.findById(productId);
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

    const deletedSeedsProduct = await SeedsProduct.findOneAndDelete({
      _id: productId,
    });

    if (!deletedSeedsProduct) {
      return res.status(404).json({ error: "Seeds Product not found" });
    }

    const updatedSeedsWarehouse = await SeedsWarehouse.findByIdAndUpdate(
      { _id: deletedSeedsProduct.farm_id },
      {
        $pull: {
          products: {
            _id: deletedSeedsProduct._id,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Seeds Product deleted successfully",
      deletedSeedsProduct,
      updatedSeedsWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleSeedsProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await SeedsProduct.findOne({
      _id: productId,
    });
    if (!product) {
      return res.status(404).json({ error: "Seeds Product not found" });
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

const updateImageFields = async (req, seedsProduct, payload) => {
  const { image, image2, image3, image4 } = req?.files;
  await processAndDeleteImage(image, seedsProduct.image, "image", payload);
  await processAndDeleteImage(image2, seedsProduct.image2, "image2", payload);
  await processAndDeleteImage(image3, seedsProduct.image3, "image3", payload);
  await processAndDeleteImage(image4, seedsProduct.image4, "image4", payload);
};

const updateSeedsProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const seedsProduct = await SeedsProduct.findOne({
      _id: productId,
    });

    if (!seedsProduct) {
      return res.status(404).json({ error: "Seeds Product not found" });
    }

    const seedsWarehouse = await SeedsWarehouse.findById(seedsProduct.farm_id);

    if (!seedsWarehouse) {
      return res.status(404).json({ error: "Seeds Warehouse is not exist." });
    }

    const payload = req.body;

    await updateImageFields(req, seedsProduct, payload);

    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }

    // Update seeds Product
    const updatedSeedsProduct = await SeedsProduct.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: payload,
      },
      { new: true }
    );

    if (!updatedSeedsProduct) {
      return res.status(404).json({ error: "Seeds Product not found" });
    }

    const previousSeedsWarehouse = await SeedsWarehouse.findByIdAndUpdate(
      { _id: updatedSeedsProduct.farm_id },
      {
        $pull: {
          products: {
            _id: updatedSeedsProduct._id,
          },
        },
      },
      { new: true }
    );
    if (previousSeedsWarehouse) {
      seedsWarehouse.products.push(updatedSeedsProduct);
    }
    const updatedSeedsWarehouse = await seedsWarehouse.save();

    res.status(200).json({
      message: "Seeds Product and Seeds Warehouse updated successfully",
      updatedSeedsProduct,
      updatedSeedsWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addSeedsProductData,
  getAllSeedsProducts,
  getAllSeedsProductForAdmin,
  deleteSeedsProducts,
  getSingleSeedsProduct,
  updateSeedsProduct,
  getSeedsProducts,
  getProducts
};
