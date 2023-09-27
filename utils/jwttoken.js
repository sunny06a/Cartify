// Desc: Send JWT token to client side as a cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    const options = {
        expiresIN : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
    });
}

module.exports = sendToken;