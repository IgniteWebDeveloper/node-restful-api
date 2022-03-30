const User = require("../model/userSchema");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/sendToken");

exports.getHomepage = (req, res) => {
  res.json(200, { message: "Welcome to the homepage" });
};

exports.postCreateUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
  });

  sendToken(user, 201, res);
});

exports.loginuser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 422));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 422));
  }

  sendToken(user, 201, res);
});
