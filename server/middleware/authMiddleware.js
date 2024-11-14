const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = await jwt.verify(
      Token,
      process.env.JWT_TOKEN
    );
    if (!decoded) throw new apiError(402, "no such user Exists");
    const User = await user.findById(decoded._id);
    if (!User) throw new apiError(402, "not found ");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = { authMiddleware, adminMiddleware };


