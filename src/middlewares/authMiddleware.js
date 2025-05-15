import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    } else {
        return res.status(401).json({
            message: "Authorization token not found."
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) { 
        return res.status(401).json({
            message: "Invalid or expired token.",
            error: error.message
        });
    }
};

export default verifyToken;