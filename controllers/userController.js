const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwttoken');

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