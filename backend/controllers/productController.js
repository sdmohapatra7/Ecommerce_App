const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeactures = require('../utils/apiFeactures');
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
//create Product ---> admin
exports.createProduct = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const imagesLinks = [];

    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });

      // delete local file after upload
      fs.unlinkSync(req.files[i].path);
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



//get all products
exports.getAllProducts = catchAsyncError(async (req,res,next)=>{
    const resultPerPage = 4;
    const productsCount = await Product.countDocuments(); 

    const apiFeature = new ApiFeactures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    
    let products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
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
    })
});

//update product   -----> admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // If new images are uploaded
  if (req.files && req.files.length > 0) {
    // Delete old images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    // Upload new images
    const imagesLinks = [];
    for (let i = 0; i < req.files.length; i++) {
      const result = await cloudinary.uploader.upload(req.files[i].path, {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });

      // delete local file after upload
      fs.unlinkSync(req.files[i].path);
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
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
    });
});

// Update a review
exports.updateReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment } = req.body;
  const reviewId = req.params.id;

  const product = await Product.findOne({ "reviews._id": reviewId });
  if (!product) {
    return next(new ErrorHandler("Product or Review not found", 404));
  }

  // Find the review inside product.reviews
  const review = product.reviews.id(reviewId);
  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  // ✅ Update only if values provided
  if (typeof rating !== "undefined") {
    review.rating = rating;
  }
  if (typeof comment !== "undefined") {
    review.comment = comment;
  }

  // ✅ If rating/comment is intentionally deleted
  if (rating === null || rating === 0) {
    review.rating = 0;
  }
  if (comment === null || comment.trim() === "") {
    review.comment = "";
  }

  // Recalculate product rating
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = product.reviews.length > 0 ? avg / product.reviews.length : 0;
  product.numOfReviews = product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review updated successfully",
    review,
  });
});


//Get All reviews of a Product
exports.getProductReviews = catchAsyncError(async(req,res,next)=>{

    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

//delete  review
exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler('Product Not Found',404));
    }
    //find review id is present or not
    const isReview = product.reviews.find(rev => rev._id.toString() === req.query.reviewId.toString());
    if(!isReview){
        return next(new ErrorHandler('Reviews Not Found',400));
    }
    //store remaining reviews and delete the review id same as req.query.id(i want to delete this review)
    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.reviewId.toString());

    //calculate avg ratings and nums of review and update it
    let avg = 0;
    reviews.forEach((rev)=>{
        avg += rev.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message:"review deleted "
    });
});