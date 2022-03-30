const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../model/userSchema");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login to access the resource", 401));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id);

  req.user = user;

  next();
});

exports.isAuthorizedroles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
