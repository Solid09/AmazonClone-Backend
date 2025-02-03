const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No valid token!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = { userId: decoded.userId };
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

const createToken = (userId) => {
  return (token = jwt.sign({ userId: userId }, process.env.JWT_KEY, {
    expiresIn: "24h",
  }));
};

module.exports = { verifyToken, createToken };
