const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//middlewares 
app.use(express.json()); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Product routes 
const product = require('./routes/productRoute');
app.use("/api/v1", product);

//User routes
const user = require('./routes/userRoute');
app.use("/api/v1", user);

//Order routes
const order = require('./routes/orderRoute');
app.use("/api/v1", order);

// Middleware to handle errors
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app;  

