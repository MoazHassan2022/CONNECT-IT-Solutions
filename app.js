const express = require("express");
const morgan = require("morgan");
const ticketRouter = require("./routes/ticketRoutes");
const projectRouter = require("./routes/projectRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const app = express();

// MIDDLEWARES

app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  })
);

/* app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['*'],
        scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
      },
    },
  })
); */

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Body parser, reading date from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss()); // prevent dangerous of html and javascript code in the request

// Prevent paramete pollution by preventing for example writing sort twice
app.use(
  hpp({
    whitelist: ["status", "priority", "subject", "category", "project"], // keep multiple durations and all of these
  })
);

// Write down the date and log the headers
app.use((req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
});

// Limit requests from sam IP address
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000, // Ms: milliseconds, this will allow the same IP address to perform only 100 request per hour
  message:
    "Too many requests from this IP address, please try again in an hour!",
});
app.use("/api", limiter); // limit only api requests

// ROUTES

app.use("/api/tickets", ticketRouter);
app.use("/api/projects", projectRouter);
app.use("/api/users", userRouter);

app.use("/api/public", express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/client/build`));
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handler middleware
app.use(globalErrorHandler);
module.exports = app;
