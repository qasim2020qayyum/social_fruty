const Order = require("../models/orderModel");
const User = require("../models/userModel");
const WholeSaler = require("../models/whole-saler/wholesalerProductModel");
const Transport = require("../models/transport/transportProductModel");
const Seeds = require("../models/seeds/seedsProductModel");
const RawMaterial = require("../models/raw-material/rawMaterialProductModel");
const Machinery = require("../models/machinery/machineryModel");
const LandBroker = require("../models/land-broker/landbrokerProductModel");
const FarmerProduct = require("../models/farmer/farmerProductModel");

const createOrder = async (req, res) => {
  try {
    const { product, buyerId } = req.body;
    let totalPrice = 0;
    const userTotalPrices = [];
    for (const item of product) {
      const user = await User.findById(item.userId);
      if (!user) {
        return res.status(404).json({
          error: `User not found for product with userID ${item.userId}`,
        });
      }
      let productPrice = 0;
      const existingUserIndex = userTotalPrices.findIndex(
        (entry) => entry.userId === item.userId
      );
      switch (user.role) {
        case "farmer":
          const farmerProduct = await FarmerProduct.findById(item.productId);
          if (!farmerProduct) {
            return res
              .status(404)
              .json({ error: `Product not found for userID ${item.userId}` });
          }
          item.product_name = farmerProduct.product_name;
          productPrice = farmerProduct.after_discount * item.quantity;
          if (existingUserIndex !== -1) {
            userTotalPrices[existingUserIndex].price += productPrice;
          } else {
            userTotalPrices.push({
              userId: item.userId,
              price: productPrice,
            });
          }
          break;
        case "wholesaler":
          const wholeSalerProduct = await WholeSaler.findById(item.productId);
          if (!wholeSalerProduct) {
            return res
              .status(404)
              .json({ error: `Product not found for userID ${item.userId}` });
          }
          item.product_name = wholeSalerProduct.product_name;
          productPrice = wholeSalerProduct.after_discount * item.quantity;
          if (existingUserIndex !== -1) {
            userTotalPrices[existingUserIndex].price += productPrice;
          } else {
            userTotalPrices.push({
              userId: item.userId,
              price: productPrice,
            });
          }
          break;
        case "transport":
          const transportProduct = await Transport.findById(item.productId);
          if (!transportProduct) {
            return res
              .status(404)
              .json({ error: `Product not found for userID ${item.userId}` });
          }
          item.product_name = transportProduct.product_name;
          productPrice = transportProduct.after_discount * item.quantity;
          if (existingUserIndex !== -1) {
            userTotalPrices[existingUserIndex].price += productPrice;
          } else {
            userTotalPrices.push({
              userId: item.userId,
              price: productPrice,
            });
          }
          break;
        case "seeds":
          const seedsProduct = await Seeds.findById(item.productId);
          if (!seedsProduct) {
            return res
              .status(404)
              .json({ error: `Product not found for userID ${item.userId}` });
          }
          item.product_name = seedsProduct.product_name;
          productPrice = seedsProduct.after_discount * item.quantity;
          if (existingUserIndex !== -1) {
            userTotalPrices[existingUserIndex].price += productPrice;
          } else {
            userTotalPrices.push({
              userId: item.userId,
              price: productPrice,
            });
          }
          break;
        case "rawMaterial":
          const rawMaterialProduct = await RawMaterial.findById(item.productId);
          if (!rawMaterialProduct) {
            return res
              .status(404)
              .json({ error: `Product not found for userID ${item.userId}` });
          }
          item.product_name = rawMaterialProduct.product_name;
          productPrice = rawMaterialProduct.after_discount * item.quantity;
          if (existingUserIndex !== -1) {
            userTotalPrices[existingUserIndex].price += productPrice;
          } else {
            userTotalPrices.push({
              userId: item.userId,
              price: productPrice,
            });
          }
          break;
        case "machinery":
          const machineryProduct = await Machinery.findById(item.productId);
          if (!machineryProduct) {
            return res
              .status(404)
              .json({ error: `Product not found for userID ${item.userId}` });
          }
          item.product_name = machineryProduct.product_name;
          productPrice = machineryProduct.after_discount * item.quantity;
          if (existingUserIndex !== -1) {
            userTotalPrices[existingUserIndex].price += productPrice;
          } else {
            userTotalPrices.push({
              userId: item.userId,
              price: productPrice,
            });
          }
          break;
        case "landBrokers":
          const landBrokerProduct = await LandBroker.findById(item.productId);
          if (!landBrokerProduct) {
            return res
              .status(404)
              .json({ error: `Product not found for userID ${item.userId}` });
          }
          item.product_name = landBrokerProduct.product_name;
          productPrice = landBrokerProduct.after_discount * item.quantity;
          if (existingUserIndex !== -1) {
            userTotalPrices[existingUserIndex].price += productPrice;
          } else {
            userTotalPrices.push({
              userId: item.userId,
              price: productPrice,
            });
          }
          break;
        default:
          break;
      }
      totalPrice += productPrice;
      item.status = "Processing";
    }
    const newOrder = new Order({
      buyerId,
      product,
      totalPrice,
      userTotalPrices,
    });

    await newOrder.save();

    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const ordersPerPage = 10; // Number of orders per page
    const totalOrders = await Order.countDocuments(); // Get the total number of orders

    const from = (page - 1) * ordersPerPage + 1; // Calculate 'from' value
    const to = Math.min(from + ordersPerPage - 1, totalOrders); // Calculate 'to' value

    const orders = await Order.find()
      .sort({ updatedAt: -1 }) // Sort by the updatedAt field in descending order (recently updated first)
      .skip(ordersPerPage * (page - 1)) // Skip orders based on the current page
      .limit(ordersPerPage); // Limit the number of orders per page

    const totalPages = Math.ceil(totalOrders / ordersPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      orders,
      meta: {
        currentPage: page,
        totalPages,
        totalOrders,
        from,
        to,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByBuyerId = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const ordersPerPage = 10; // Number of orders per page

    // Fetch orders for the specified buyerId with pagination
    const orders = await Order.find({ buyerId })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (most recent first)
      .skip(ordersPerPage * (page - 1)) // Skip orders based on the current page
      .limit(ordersPerPage); // Limit the number of orders per page

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ error: "No orders found for the specified buyerId" });
    }

    const totalOrders = await Order.countDocuments({ buyerId }); // Get the total number of orders for the specified buyerId
    const totalPages = Math.ceil(totalOrders / ordersPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.baseUrl
    }/${buyerId}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      success: true,
      data: orders,
      meta: {
        currentPage: page,
        totalPages,
        totalOrders,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1; // Get the current page from query parameters, default to 1
    const ordersPerPage = 10; // Number of orders per page

    // Fetch orders where at least one product in the product array has a userId that matches the provided userId
    const orders = await Order.aggregate([
      { $match: { "product.userId": userId } },
      {
        $project: {
          product: {
            $filter: {
              input: "$product",
              as: "item",
              cond: { $eq: ["$$item.userId", userId] },
            },
          },
          buyerId: 1, // Include other fields you want to retrieve
          totalPrice: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $sort: { createdAt: -1 } }, // Sort by createdAt field in descending order (most recent first)
      { $skip: (page - 1) * ordersPerPage }, // Skip orders based on the current page
      { $limit: ordersPerPage }, // Limit the number of orders per page
    ]);

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ error: "No orders found for the specified userID in product" });
    }

    const totalOrders = await Order.countDocuments({
      "product.userId": userId,
    }); // Get the total number of orders for the specified userID
    const totalPages = Math.ceil(totalOrders / ordersPerPage); // Calculate total pages

    // Generate pagination links
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.baseUrl
    }/user/${userId}`;
    const paginationLinks = {
      first: `${baseUrl}?page=1`,
      prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
      next: page < totalPages ? `${baseUrl}?page=${page + 1}` : null,
      last: `${baseUrl}?page=${totalPages}`,
    };

    res.status(200).json({
      success: true,
      data: orders,
      meta: {
        currentPage: page,
        totalPages,
        totalOrders,
        links: paginationLinks,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleOrderByUserId = async (req, res) => {
  try {
    const { orderId, userId } = req.params;

    // Find the order with the provided orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the user with the provided userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the user's role
    const userRole = user.role;

    // Define an array to store product details
    let products = [];

    // Iterate through each product in the order's product array
    for (const product of order.product) {
      // Skip the product if its userId doesn't match the provided userId
      if (product.userId !== userId) {
        continue;
      }

      // Define the product model based on the user's role
      let productModel;

      switch (userRole) {
        case "farmer":
          productModel = FarmerProduct;
          break;
        case "wholesaler":
          productModel = WholeSaler;
          break;
        case "machinery":
          productModel = Machinery;
          break;
        case "seeds":
          productModel = Seeds;
          break;
        case "rawMaterial":
          productModel = RawMaterial;
          break;
        case "landBrokers":
          productModel = LandBroker;
          break;
        case "transport":
          productModel = Transport;
          break;
        default:
          return res.status(400).json({ error: "Invalid user role" });
      }

      // Find the product using the product model
      const foundProduct = await productModel.findById(product.productId);

      if (!foundProduct) {
        return res
          .status(404)
          .json({ error: `Product not found for ID: ${product.productId}` });
      }

      // Add product details to the products array
      products.push(foundProduct);
    }

    res.status(200).json({
      success: true,
      order,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleOrderByBuyerId = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order with the provided orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Define an array to store product details
    let products = [];

    // Iterate through each product in the order's product array
    for (const product of order.product) {
      // Find the user by userId
      const user = await User.findById(product.userId);

      if (!user) {
        return res
          .status(404)
          .json({ error: `User not found for userId: ${product.userId}` });
      }

      // Retrieve the user's role
      const userRole = user.role;

      // Define the product model based on the user's role
      let productModel;

      switch (userRole) {
        case "farmer":
          productModel = FarmerProduct;
          break;
        case "wholesaler":
          productModel = WholeSaler;
          break;
        case "machinery":
          productModel = Machinery;
          break;
        case "seeds":
          productModel = Seeds;
          break;
        case "rawMaterial":
          productModel = RawMaterial;
          break;
        case "landBrokers":
          productModel = LandBroker;
          break;
        case "transport":
          productModel = Transport;
          break;
        default:
          return res.status(400).json({ error: "Invalid user role" });
      }

      // Find the product using the product model and productId
      const foundProduct = await productModel.findById(product.productId);

      if (!foundProduct) {
        return res.status(404).json({
          error: `Product not found for productId: ${product.productId}`,
        });
      }

      // Add product details to the products array
      products.push(foundProduct);
    }

    // Return the order details along with the array of products
    res.status(200).json({
      success: true,
      order,
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByBuyerId,
  getOrdersByUserId,
  getSingleOrderByUserId,
  getSingleOrderByBuyerId,
};
