const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');

//create new product by admin => /api/v1/prodct/product/new 
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    
    let images = [];
    if(typeof req.body.images === 'string'){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }

    const imagesLinks = [];
    for(let i=0; i<images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id; 

    const product = await Product.create(req.body);
    res.status(201).json({  //201 means something is created
        success: true,
        product
    })
});
  

//get all products with Search and filter  => /api/v1/prodct/products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature= new APIFeatures(Product.find(), req.query).search().filter();
    
    let product = await apiFeature.query;
    let filteredProductCount = product.length;
    
    apiFeature.pagination(resultPerPage);
    // product = await apiFeature.query;
    
    res.status(201).json({
        success: true,
        product,
        productCount,
        resultPerPage,
        filteredProductCount
    })
});

//get single product details => /api/v1/prodct/product/:id
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


//update product => /api/v1/prodct/product/:id  
exports.updateProduct = catchAsyncErrors(async(req, res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
     }
    let images = [];
    if(typeof req.body.images === 'string'){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }
    if(images !== undefined){  
        //delete images associated with product
        for(let i=0; i<product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        const imagesLinks = [];
        for(let i=0; i<images.length; i++){
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLinks;
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

//delete product => /api/v1/prodct/product/:id
exports.deleteProduct = catchAsyncErrors(async(req, res,next) => {
    const product = await Product.findById(req.params.id);
      if(!product){
       return next(new ErrorHandler('Product not found', 404));
    }
    //delete images associated with product
    for(let i=0; i<product.images.length; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
}); 

//create new review => /api/v1/prodct/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.comment = comment;
                rev.rating = rating;
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg=0;
    product.ratings = product.reviews.forEach((rev) => { avg+=rev.rating})
    product.ratings=  avg/product.reviews.length;

    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success: true,
        message: 'Review added successfully'
    });
});

//get all product reviews => /api/v1/prodct/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findById(req.query.id);
    
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
}) 

//delete product review => /api/v1/prodct/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  
    const product = await Product.findById(req.query.productId);
    
    if(!product){
        return next(new ErrorHandler('Product not found', 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
    
    let avg=0;
    reviews.forEach((rev) => { avg+=rev.rating})
    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0
    } else {
        ratings = avg / reviews.length
    }
    
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews: reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
        });

    res.status(200).json({
        success: true,
    });

});


//get all products with Search and filter  => /api/v1/prodct/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    
    const products = await Product.find();

    res.status(201).json({
        success: true,
        products
    })
});
