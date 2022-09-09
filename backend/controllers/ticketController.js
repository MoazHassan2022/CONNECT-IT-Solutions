const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Ticket = require('./../models/ticketsModel');
const makeRandomString = require('./../utils/randomString');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/tickets');
  },
  filename: async (req, file, cb) => {
    console.log(file);
    if (file.mimetype.startsWith('image')) {
      return cb(null, `ticket-${makeRandomString()}-${Date.now()}.jpg`);
    }
    cb(null, `ticket-${makeRandomString()}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.uploadTicketFiles = upload.array('attachments', 10);

exports.getAllTickets = catchAsync(async (req, res, next) => {
  /*if (req.query.id) {
    const id = req.query.id;
    // Send all tickets belonging to this id, maybe adminID or clientID
    delete req.query.id;
    const features = new APIFeatures(
      Ticket.find({ $or: [{ adminID: id }, { clientID: id }] }),
      req.query
    )
      .filter()
      .sort()
      .selectFields()
      .paginate();
    const tickets = await features.query;
    return res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      results: tickets.length,
      data: {
        tickets,
      },
    });
  }*/
  if (!req.query['status']) req.query['status'] = 3;
  const features = new APIFeatures(Ticket.find(), req.query)
    .filter()
    .sort()
    .selectFields()
    .paginate();
  const tickets = await features.query;
  /*tickets.forEach((el) =>
    el['comments'].sort((a, b) => a['createdAt'] < b['createdAt'])
  );*/
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tickets.length,
    data: {
      tickets,
    },
  });
});
exports.createTicket = catchAsync(async (req, res, next) => {
  req.body.attachments = [];
  if (req.files) {
    req.files.forEach((file) => req.body.attachments.push(file.filename));
  }
  req.body.client = req.user._id;
  req.body.createdAt = req.requestTime;
  const newTicket = await Ticket.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      ticket: newTicket,
    },
  });
});
exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });
});
exports.updateTicket = catchAsync(async (req, res, next) => {
  if (req.body.comment) {
    let ticket = await Ticket.findById(req.params.id);
    req.body.comment['name'] = req.user.name;
    req.body.comment['photo'] = req.user.photo;
    req.body.comment['createdAt'] = req.requestTime;
    if (req.body.comment.isAnswer && req.user.isAdmin)
      ticket['answer'] = req.body.comment.content;
    ticket['comments'].push(req.body.comment);
    await ticket.save();
    return res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  }
  if (req.body.admin) {
    if (!req.user.isAdmin)
      return next(new AppError('You are not an admin!', 401));
    req.body.admin = req.user._id;
    req.body.status = 2;
  }
  if (req.body.status === 3) {
    if (req.user.isAdmin)
      return next(new AppError('You are not a client!', 401));
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return next(new AppError('Ticket not found!', 404));
    }
    if (req.user._id.toString() !== ticket.client._id.toString())
      return next(new AppError('You are not the owner!', 404));
    ticket.status = req.body.status;
    await ticket.save();
    return res.status(200).json({
      status: 'success',
      data: {
        ticket,
      },
    });
  }
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return the newly updated ticket
    runValidators: true, // validate with our schema on the new values
  });
  if (!ticket) {
    return next(new AppError('Ticket not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });
});
