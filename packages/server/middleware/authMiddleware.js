const User = require("../models/user");

const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorResponse = require("../utils/errorResponse");

//check if user is authenticated or not

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Token not provided
    return res.status(401).json({ error: "Authentication required" });
  }

  // The token is usually sent in the format "Bearer token"
  const token = authHeader.split(" ")[1] ?? req.cookies;

  if (!token) {
    return next(new ErrorResponse("You neeed to log in for this action.", 401));
  }
  try {
    //verify token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
});
