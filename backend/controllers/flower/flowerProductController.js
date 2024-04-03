const flowerProduct = require("../../models/flower/floweProductModel");
const FlowerWarehouse = require("../../models/flower/flowerIndustryModel");
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

const addFlowerProductData = async (req, res) => {
    try {
      const { flowerWarehouseId } = req.params;
      const wholesalerWarehouse = await FlowerWarehouse.findById(
        flowerWarehouseId
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
      const newWholesalerWarehouse = new flowerProduct(payload);
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

  module.exports = {
    addFlowerProductData
  };
  