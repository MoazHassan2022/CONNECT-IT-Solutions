const APIFeatures = require('../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/usersModel');
const Ticket = require('./../models/ticketsModel');
const makeRandomString = require('./../utils/randomString');
const multer = require('multer');
const sharp = require('sharp');

/*const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split('/')[1]; // store the extension
    cb(null, `user-${makeRandomString()}-${Date.now()}.${extension}`);
  },
});*/
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${makeRandomString()}-${Date.now()}.jpg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpg')
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

const filterObj = (obj, ...allowed) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowed.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for updating the password, Please use this route /updateMyPassword',
        400
      )
    );
  const filteredBody = filterObj(req.body, 'name', 'email', 'companyName');
  if (req.file) filteredBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true, // return the updated user
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    results: 1,
    requiredAt: req.requestTime,
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    requiredAt: req.requestTime,
    requestAt: req.requestTime,
    data: {
      users,
    },
  });
});
exports.getMyTickets = catchAsync(async (req, res) => {
  let options = {
    $or: [{ admin: req.user.id }, { client: req.user.id }],
  };
  if (req.query.subject) {
    options.subject = { $regex: req.query.subject, $options: 'i' };
    delete req.query.subject;
  }
  const features = new APIFeatures(Ticket.find(options), req.query)
    .filter()
    .sort()
    .selectFields()
    .paginate();
  const tickets = await features.query;
  if (req.query.sort && req.query.sort === '-createdAt') tickets.reverse();
  res.status(200).json({
    status: 'success',
    results: tickets.length,
    requiredAt: req.requestTime,
    data: {
      tickets,
    },
  });
});
