const express = require("express");
const connectDB = require("./db/connect.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const productRoute = require("./routes/product.js");
const cartRoute = require("./routes/cart.js");
const orderRoute = require("./routes/order.js");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/user/auth", authRoute);
// app.use("/api/v1/products", productRoute);
// app.use("/api/v1/carts", cartRoute);
// app.use("/api/v1/orders", orderRoute);
// app.use("/api/v1/checkout", stripeRoute);

app.use("/api/user", userRoute);
app.use("/api/user/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
