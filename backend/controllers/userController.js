const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sandEmail = require('../utils/sandEmail');

//Register A User
exports.registerUser = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicurl"
        }
    });

    sendToken(user,201,res);  // call the token function here
});

//Login User
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;
    //check if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    sendToken(user,200,res);
});

//Logout User
exports.logoutUser = catchAsyncError(async(req,res,next)=>{

    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logout Successfuly"
    });
});

//Forgot Passsword
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler('user not found',404));
    }

    //getresetpasswordToken
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});  

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n if you not requested this email then, please ignore it`;

    try{
        await sandEmail({
            email:user.email,
            subject:'Ecommerce Password Recovery',
            message,
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    }catch(err){
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;
        await user.save({validateBeforeSave:false}); 
        return next(new ErrorHandler(err.message,500));
    }
})