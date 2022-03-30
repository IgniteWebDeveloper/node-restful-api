const sendToken = (user, statusCode, res) => {
  const token = user.jwtToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
