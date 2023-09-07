const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');

//create new product by admin => /api/v1/product/new 
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});
  

//get all products => /api/v1/products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

//get single product details => /api/v1/product/:id
exports.getProductDetails = catchAsyncErrors(async(req, res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
       return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        product
    })
});


//update product => /api/v1/product/:id  
exports.updateProduct = catchAsyncErrors(async(req, res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
     }

    product = await Product.findByIdAndUpdate(req.params.id,req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModify: false });
    res.status(200).json({
        success: true,
        product
    })
});

//delete product => /api/v1/product/:id
exports.deleteProduct = catchAsyncErrors(async(req, res,next) => {
    const product = await Product.findById(req.params.id);
      if(!product){
       return next(new ErrorHandler('Product not found', 404));
    }
  
     await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
}); 