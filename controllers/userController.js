const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name, email, password} =req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: 'avatarskhachhang.png',
            url: 'https://res.cloudinary.com/dxqqlv3zg/image/upload/v1620281183/avatarskhachhang.png'
        }
    });
    sendToken(user, 201, res);
});


//Login user => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    //check if email and password is entered by user 
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    const user = await User.findOne({email}).select('+password');
    
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res);
});


//Logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged out'
    });
}
);


//Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));
    }

    //Get reset token from user model
    const resetToken = user.getResetPasswordToken();

    //User with reset token is not saved in database so we need to save it
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Cartify Password Recovery',
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        });
    }
    catch(error){
        // if any error occurs then we need to delete the reset token and reset expire time
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
});


//Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //create hash token to find user
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    //find user with resetPasswordToken and resetPasswordExpire greater than current time(5 min)
    const user = await User.findOne({resetPasswordToken, resetPasswordExpire:{$gt: Date.now()}});
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400));
    }
 
    //Setup new password and delete token
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
});


//Get user details => /api/v1/profile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    });
});

//update password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    //check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);

    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400));
    }
    
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);

});

//update user profile => /api/v1/profile/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUser ={
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true, 
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
});


//admin route to get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});

//admin route to get single user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    });
});


//update user role by admin=> /api/v1/admin/updateRole
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
    const newUser ={
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true, 
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    });
});

//delete user by admin => /api/v1/admin/delete/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
    }

    //remove avatar from cloudinary
     await user.remove();
    
     res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
});