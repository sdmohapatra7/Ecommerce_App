// sendToken.js
const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken(); // Assuming user model has getJwtToken()

    // Cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // JS cannot access cookie
        secure: process.env.NODE_ENV === 'production', // only send over HTTPS in prod
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // cross-site in prod
    };

    res.status(statusCode)
       .cookie("token", token, options)
       .json({
           success: true,
           user,
           token // optional, sometimes frontend does not need this if cookie is used
       });
};

module.exports = sendToken;
