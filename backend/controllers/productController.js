const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//create Product ---> admin
exports.createProduct = catchAsyncError(async (req,res,next)=>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});


//get all products
exports.getAllProducts = catchAsyncError(async (req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
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
        product
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