const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

//create new order....
exports.newOrder = catchAsyncError(async(req,res,next)=>{

    //destructure the data from body
    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;
    
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(201).json({
        success: true,
        message: 'Order Created Successfully',
        order
    });
});

//get login user Single Order 
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        return next(new ErrorHandler('order not found with this id',404));
    }

    return res.status(200).json({
        success: true,
        order,
    });
});

//get login user orders
exports.myOrders = catchAsyncError(async(req,res,next)=>{
    const order = await Order.find({user:req.user._id});
    
    return res.status(200).json({
        success: true,
        order,
    });
});