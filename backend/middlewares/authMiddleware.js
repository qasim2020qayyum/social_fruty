const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// checking the token if exist or not
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Not Authorized: No token in header" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Not Authorized" });
    }
    req.user = user;
    next();
  });
};
// checking the role from token if its admin or not
const authorizeAdmin = (req, res, next) => {
  const { userRole } = req.user;
  if (userRole !== "admin") {
    return res
      .status(403)
      .json({ error: "Not Authorized: Admin access required" });
  }
  next();
};
// checking the user is it block or not
const checkBlockedStatus = async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.isBlocked) {
    return res.status(403).json({
      error: "You are blocked. Contact the administrator for assistance.",
    });
  }
  next();
};
module.exports = { authenticateToken, authorizeAdmin, checkBlockedStatus };
