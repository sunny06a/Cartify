const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors")
dotenv.config({ path: 'backend/config/config.env' })

//middlewares 
app.use(cors({
    origin: "https://Caritdy.vercel.app",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true
}));
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

//Payment routes
const payment = require('./routes/paymentRoute');
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname,"../frontend/build"))); 
app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,"../frontend/build/index.html")));
// Middleware to handle errors
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app;  

