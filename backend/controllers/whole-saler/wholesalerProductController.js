// const dirname = require('../../uploads')
const WholeSalerProduct = require("../../models/whole-saler/wholesalerProductModel");
const WholesalerWarehouse = require("../../models/whole-saler/wholesalerWarehouseModel");
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

const addWholesalerProductData = async (req, res) => {
  try {
    const { wholesalerWarehouseId } = req.params;
    const wholesalerWarehouse = await WholesalerWarehouse.findById(
      wholesalerWarehouseId
    );
    if (!wholesalerWarehouse) {
      return res
        .status(403)
        .json({ error: "Wholesaler Warehouse do not exist" });
    }
    const payload = req.body;
    await processImageFields(req, payload);
    payload.farmer_id = wholesalerWarehouse.farmer_id;
    payload.farmer_name = wholesalerWarehouse.farmer_name;
    payload.farm_name = wholesalerWarehouse.farm_name;
    payload.farm_id = wholesalerWarehouse._id;

    // Check if there is a discount, and calculate the after_discount price
    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }
    const newWholesalerWarehouse = new WholeSalerProduct(payload);
    const product = await newWholesalerWarehouse.save();
    wholesalerWarehouse.products.push(product);
    const updatedWholesalerWarehouse = await wholesalerWarehouse.save();
    res.status(201).json({
      message: "Wholesaler Product added successfully",
      product,
      updatedWholesalerWarehouse,
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

    const totalProducts = await WholeSalerProduct.countDocuments();

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await WholeSalerProduct.find()
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

const getWholesalerProducts = async (req, res) => {
  try {
    const { wholesalerId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await WholeSalerProduct.countDocuments({
      farmer_id: wholesalerId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await WholeSalerProduct.find({
      farmer_id: wholesalerId,
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

const getAllWholesalerProducts = async (req, res) => {
  try {
    const { wholesalerWarehouseId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const productsPerPage = 10;

    const totalProducts = await WholeSalerProduct.countDocuments({
      farm_id: wholesalerWarehouseId,
    });

    const from = (page - 1) * productsPerPage + 1;
    const to = Math.min(from + productsPerPage - 1, totalProducts);

    const products = await WholeSalerProduct.find({
      farm_id: wholesalerWarehouseId,
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



const getAllWholesalerProductForAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const productPerPage = 10;

    const totalproducts = await WholeSalerProduct.countDocuments();

    const from = (page - 1) * productPerPage + 1;
    const to = Math.min(from + productPerPage - 1, totalproducts);

    const productData = await WholeSalerProduct.find()
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

const deleteWholesalerProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await WholeSalerProduct.findById(productId);
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

    const deletedWholeSalerProduct = await WholeSalerProduct.findOneAndDelete({
      _id: productId,
    });

    if (!deletedWholeSalerProduct) {
      return res.status(404).json({ error: "Wholesaler Product not found" });
    }

    const updatedWholeSalerWarehouse =
      await WholesalerWarehouse.findByIdAndUpdate(
        { _id: deletedWholeSalerProduct.farm_id },
        {
          $pull: {
            products: {
              _id: deletedWholeSalerProduct._id,
            },
          },
        },
        { new: true }
      );

    res.status(200).json({
      message: "Wholesaler Product deleted successfully",
      deletedWholeSalerProduct,
      updatedWholeSalerWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleWholesalerProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await WholeSalerProduct.findOne({
      _id: productId,
    });
    if (!product) {
      return res.status(404).json({ error: "Wholesaler Product not found" });
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

const updateImageFields = async (req, WholesalerProduct, payload) => {
  const { image, image2, image3, image4 } = req?.files;
  await processAndDeleteImage(image, WholesalerProduct.image, "image", payload);
  await processAndDeleteImage(
    image2,
    WholesalerProduct.image2,
    "image2",
    payload
  );
  await processAndDeleteImage(
    image3,
    WholesalerProduct.image3,
    "image3",
    payload
  );
  await processAndDeleteImage(
    image4,
    WholesalerProduct.image4,
    "image4",
    payload
  );
};

const updateWholesalerProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const wholesalerProduct = await WholeSalerProduct.findOne({
      _id: productId,
    });

    if (!wholesalerProduct) {
      return res.status(404).json({ error: "Wholesaler Product not found" });
    }

    const wholesalerWarehouse = await WholesalerWarehouse.findById(
      wholesalerProduct.farm_id
    );

    if (!wholesalerWarehouse) {
      return res
        .status(404)
        .json({ error: "Wholesaler Warehouse is not exist." });
    }

    const payload = req.body;

    await updateImageFields(req, wholesalerProduct, payload);

    if (payload.discount && payload.product_price) {
      const discount = parseFloat(payload.discount);
      const productPrice = parseFloat(payload.product_price);
      const afterDiscount = productPrice - (productPrice * discount) / 100;
      payload.after_discount = afterDiscount.toFixed(2);
    }

    // Update Wholesaler Warehouse Product
    const updatedWholesalerProduct = await WholeSalerProduct.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $set: payload,
      },
      { new: true }
    );

    if (!updatedWholesalerProduct) {
      return res.status(404).json({ error: "Wholesaler Product not found" });
    }

    const previousWholesalerWarehouse =
      await WholesalerWarehouse.findByIdAndUpdate(
        { _id: updatedWholesalerProduct.farm_id },
        {
          $pull: {
            products: {
              _id: updatedWholesalerProduct._id,
            },
          },
        },
        { new: true }
      );
    if (previousWholesalerWarehouse) {
      wholesalerWarehouse.products.push(updatedWholesalerProduct);
    }
    const updatedWholesalerWarehouse = await wholesalerWarehouse.save();

    res.status(200).json({
      message:
        "Wholesaler Product and Wholesaler Warehouse updated successfully",
      updatedWholesalerProduct,
      updatedWholesalerWarehouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addWholesalerProductData,
  getAllWholesalerProducts,
  getAllWholesalerProductForAdmin,
  deleteWholesalerProducts,
  getSingleWholesalerProduct,
  updateWholesalerProduct,
  getWholesalerProducts,
  getProducts
};
