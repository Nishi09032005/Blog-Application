const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const authMiddleware = async (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Remove "Bearer " from the token string if it exists
        const jwtToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();

        // Verify the JWT token using the secret
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        
        // Find the user based on the email from the decoded token
        const userData = await User.findOne({ email: decoded.email }).select('-password'); // Exclude the password field

        // If no user is found, return unauthorized
        if (!userData) {
            return res.status(401).json({ message: 'Invalid token, authorization denied' });
        }

        // Attach user data and token to the request object
        req.user = userData;
        req.token = jwtToken;
        req.userId = userData._id;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If the token verification fails, return an error response
        res.status(401).json({ message: 'Token is not valid', error: err.message });
    }
};

module.exports = authMiddleware;
