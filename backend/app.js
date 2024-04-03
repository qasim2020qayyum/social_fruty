const bodyParser = require("body-parser");
// aws
const AWS = require("aws-sdk");
const connectDB = require("./db/conn");
const env = require("dotenv").config();
const upload = require("express-fileupload");
const path = require("path");
const express = require("express");
const http = require("http");
const cors = require("cors");
const ChatSocket = require("./socket/ChatSocket");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(upload());
app.use(express.urlencoded({ extended: false }));
connectDB();
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/fruit/user", require("./router/userRouter"));
app.use("/employee", require("./router/employeeRouter"));
app.use("/order", require("./router/orderRouter"));
app.use("/social", require("./router/social/contactRouter"));
app.use("/emailtemplates", require("./router/templateRouter"));

// farmer start
app.use("/farmer", require("./router/farmer/farmerIndustryRouter"));
app.use("/farmer-product", require("./router/farmer/farmerProductRouter"));
// farmer end done
// machinery start
app.use("/machinery", require("./router/machinery/machineryDistributorRouter"));
app.use("/machine", require("./router/machinery/machineryRouter"));
// machinery end
// wholesaler start
app.use(
  "/wholesaler",
  require("./router/whole-saler/wholesalerWarehouseRouter")
);
app.use(
  "/wholesaler-product",
  require("./router/whole-saler/wholesalerProductRouter")
);
// wholesaler end done

// seeds start
app.use("/seeds", require("./router/seeds/seedsWarehouseRouter"));
app.use("/seeds-product", require("./router/seeds/seedsProductRouter"));
// seeds end done

// rawmaterial start
app.use(
  "/rawmaterial",
  require("./router/raw-material/rawMaterialWarehouseRouter")
);
app.use(
  "/rawmaterial-product",
  require("./router/raw-material/rawMaterialProductRouter")
);
// rawmaterial end done

// landbroker start
app.use("/landbroker", require("./router/land-broker/LandbrokerRouter"));
app.use(
  "/landbroker-product",
  require("./router/land-broker/landbrokerProductRouter")
);
// landbroker end

// transport start
app.use("/transport", require("./router/transport/transportRouter"));
app.use(
  "/transport-product",
  require("./router/transport/transportProductRouter")
);
// transport end

//flower start
app.use("/flower", require("./router/flower/flowerIndustryRouter"));
app.use("/flower-product", require("./router/flower/flowerProductRouter"));

const server = http.createServer(app);
ChatSocket(server, app);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// mongodb+srv://frutychat:qasimchat@cluster0.un5xuao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://frutychat:<password>@cluster0.un5xuao.mongodb.net/
// MONGO_URI=mongodb://localhost:27017/fruitsauction