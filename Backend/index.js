const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db/connect.js');
const authRoute = require('./routes/auth.js');
require('dotenv').config();
const userRoute = require('./routes/user.js')
const productRoute = require('./routes/product.js');
const cartRoute = require('./routes/cart.js');
const orderRoute = require('./routes/order.js');
const app = express();
app.use(express.json());
app.use('/api/v1/user', userRoute);
app.use('/api/v1/user/auth',authRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/carts', cartRoute);
app.use('/api/v1/orders', orderRoute);


const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start()