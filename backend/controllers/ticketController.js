const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTickets = catchAsync(async (req, res, next) => {
  /*const features = new APIFeatures(Ticket.find(), req.query)
    .filter()
    .sort()
    .selectFields()
    .paginate();*/
  //const tickets = await features.query;
  const tickets = [
    {
      ticketID: 123,
      ticketName: 'm',
    },
  ];
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
  // const newTicket = await Ticket.create(req.body);
  const newTicket = {
    ticketID: 123,
    ticketName: 'm',
  };
  res.status(201).json({
    status: 'success',
    data: {
      ticket: newTicket,
    },
  });
});
