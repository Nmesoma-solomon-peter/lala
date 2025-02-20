require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
    const token = req.cookies.tokenlala;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Handle specific JWT errors
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ error: "Invalid token." });
            }
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expired." });
            }
            // Handle other errors
            return res.status(401).json({ error: "Unauthorized. Token verification failed." });
        }

        // If token is valid, attach the decoded payload to the request object
        req.user = decoded;
        next();
    });
}