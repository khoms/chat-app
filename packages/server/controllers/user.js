const User = require("../models/user");

// get single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorResponse("User not found with the id of " + req.params.id, 404)
      );
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) {
      return next(new ErrorResponse("User not found."));
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
