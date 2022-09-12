const { promisify } = require('util'); // built in nofe module
const User = require('./../models/usersModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.filename;
  const newUser = await User.create(req.body);
  const token = signToken(newUser._id);
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide email and password!', 401));
  const user = await User.findOne({ email }).select('+password'); // {email: email} = {email}
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password!', 401));
  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  // Check if there is no token
  if (!token)
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    ); // 401 unauthorized
  // payload here is user id
  // verify the token
  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  // check if the user is still exists
  const user = await User.findById(decodedPayload.id);
  if (!user)
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  // check if the user changed his password after this token
  if (user.changedPasswordAfter(decodedPayload.iat))
    // iat: issued at
    return next(
      new AppError('User recently changed password! Please log in again.'),
      401
    );

  // save the user for the next middleware
  req.user = user;
  next();
});

/*exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user with POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with this email address!', 404));
  }
  // 2) Generate the random reset token
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); // in order to save the passwordResetToken and passwordResetExpires
  // 3) Send the reset token to the user email
  const reqURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Click on this link ${reqURL} to reset it\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Your password reset link (Valid for just 10 min)',
      message,
    });
    res.status(200).json({
      status: 'succes',
      message: 'Link is sent to the email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('There was an error in sending the mail!', 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user with token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passswordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token is not expired and there is a user, set the new password

  if (!user) return next(new AppError('Link is invalid or expired!', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // Log the user in: send JWT
  createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get user
  const user = await User.findById(req.user._id).select('+password');
  // check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError('Incorrect password!'), 401);
  // if so, update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // Log the user in: send JWT
  createAndSendToken(user, 200, res);
});*/
