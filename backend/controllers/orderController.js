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
        paidAt:paymentInfo.status === "Cash On Delivery" ? null : Date.now(),
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

//get all order -->admin
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmmount = 0;
    orders.forEach((order)=>{
        totalAmmount += order.totalPrice;
    });

    return res.status(200).json({
        success: true,
        orders,
        totalAmmount
    });
});

//Update order status --> admin
exports.updateOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler('Order Not Found with this id',404));
    }

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order',404));
    }

    order.orderItems.forEach(async(oItems)=>{
        await updateStock(oItems.product, oItems.quantity);
    });

    order.orderStatus = req.body.status;

    if(req.body.status === 'Delivered'){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false });

    return res.status(200).json({
        success: true,
        message: 'Order Status Update Successfully'
    });
});

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave: false });
};

//delete order --> admin
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findByIdAndDelete(req.params.id);

    if(!order){
        return next(new ErrorHandler('Order Not Found with this id',404));
    }
    return res.status(200).json({
        success: true,
        message:'Order Deleted Successfully'
    });
});