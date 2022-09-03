const express = require('express');
const morgan = require('morgan');
const ticketRouter = require('./routes/ticketRoutes');
const dummyInfoRouter = require('./routes/dummyInfoRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'dev') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// ROUTES

app.use('/api/tickets', ticketRouter);
app.use('/api/dummyInfo', dummyInfoRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handler middleware
app.use(globalErrorHandler);
module.exports = app;
