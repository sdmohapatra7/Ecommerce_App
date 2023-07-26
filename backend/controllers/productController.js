const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeactures = require('../utils/apiFeactures');

//create Product ---> admin
exports.createProduct = catchAsyncError(async (req,res)=>{
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});


//get all products
exports.getAllProducts = catchAsyncError(async (req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments(); 

    const apiFeacture = new ApiFeactures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeacture.query;
    res.status(200).json({
        success:true,
        products,
        productCount
    })
});

//get product details
exports.getProductDetails = catchAsyncError(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        product,
        productCount
    })
});

//update product   -----> admin
exports.updateProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
});

//delete product ----> admin
exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if(!deleteProduct){
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        message:'Product Deleted Successfuly'
    })
});

//Create new review or update the review
exports.createProductReview = catchAsyncError(async (req,res,next)=>{

    const{rating,comment,productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev =>{
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        })
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) =>{
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
})