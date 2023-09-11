const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const APIFeatures = require('../utils/apifeatures');


//create new product by admin => /api/v1/prodct/product/new 
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
        
    req.body.user = req.user.id; 

    const product = await Product.create(req.body);
    res.status(201).json({  //201 means something is created
        success: true,
        product
    })
});
  

//get all products with Search and filter  => /api/v1/prodct/products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 3;
    const productCount = await Product.countDocuments();
    const apiFeature= new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerPage);
    const product = await apiFeature.query;
    res.status(201).json({
        success: true,
        product,
        productCount
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
  
     await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })
}); 

//create new review => /api/v1/prodct/review
//Create new review => /api/v1/prodct/review
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

    const newReviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
    
    let avg=0;
    newReviews.forEach((rev) => { avg+=rev.rating})
    const ratings = avg/newReviews.length?(avg/newReviews.length):0;
    const numOfReviews = newReviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews: newReviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
        });

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });

});