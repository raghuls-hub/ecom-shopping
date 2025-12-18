const express = require("express");
const ProductRoute = require("./routes/productRoutes.js");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const connectDB = require("./config/db.js");

connectDB(); // Connect to MongoDB
const app = express();
app.use(express.json());
app.use(cors())
app.use("/api", ProductRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
