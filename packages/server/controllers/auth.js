const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");
const sendToken = require("../middleware/jwtToken");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // try {
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 200, res);
});

exports.userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(
        new ErrorResponse("Please Provide an Email and Password", 400)
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Email", 401));
    }

    //Check if password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Email and Password donot match", 400));
    }

    //Create Token
    const token = user.getSignedJwtToken();

    // res.status(200).json({ success: true, token, data: user.id });

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
});
