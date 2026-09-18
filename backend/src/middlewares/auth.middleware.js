const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
    }
  } else { 
    res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
