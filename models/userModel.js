const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [25, 'Your name cannot exceed 30 characters'],
        minLength: [5, 'Your name should have atleast 4 characters'],
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Your password should have atleast 8 characters'],
        select: false  //when we get user data by find(), we don't want to get password
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

//Encrypting password before saving user 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});
  
//JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//Generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generate token of 20 characters
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hash and set to resetPasswordToken sha256 is a hashing algorithm , update is used to update the resetToken and digest is used to convert the resetToken into hexadecimal
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 5*60*1000; //5 minutes

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);