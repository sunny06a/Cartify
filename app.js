const express = require('express');
const app = express();
app.use(express.json()); 

//Product routes 
const product = require('./routes/productRoute');
app.use("/api/v1", product);

// Middleware to handle errors
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app;  

