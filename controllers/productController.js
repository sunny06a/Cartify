const Product = require('../models/productModel');

//create new product by admin => /api/v1/product/new 
exports.createProduct = async (req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}
  

//get all products => /api/v1/products
exports.getAllProducts = async(req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}

//get single product details => /api/v1/product/:id
exports.getProductDetails = async(req, res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}


//update product => /api/v1/product/:id  
exports.updateProduct = async(req, res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModify: false });
    res.status(200).json({
        success: true,
        product
    })
}

//delete product => /api/v1/product/:id

exports.deleteProduct = async(req, res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
     await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
}