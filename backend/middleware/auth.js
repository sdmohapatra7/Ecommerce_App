const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    let token;

    // Check for token in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeData.id);
        next();
    } catch (err) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});


exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}