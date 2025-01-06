const express = require('express');
const morgan = require('morgan');
const Log = require('./Middlware/logMiddlware');

const path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const compression = require('compression');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/errorController');

const organizationRoutes = require('./routes/organizationRouter');
const userRouter = require('./routes/userRouter');
const paymentSettingRouter = require('./routes/paymentSettingRouter');
const paymentRouter = require('./routes/paymentRouter');
const resetRouter=require('./routes/resetRoute');
//const smsRoutes=require('./routes/smsRoutes');


const app = express(); //start Express app

app.enable('trust proxy'); //Set trust proxy correctly based on whether your application is behind a proxy.

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// #1 Global Middlwares
// Implement CORS
//Postman usually sets null as the origin unless specified otherwise. 
// This may cause your server to reject requests if null is not included in the origin list.
let corsOptions;
if (process.env.NODE_ENV === 'production') {
  corsOptions = {
    origin: ['http://49.13.235.6','http://banapvs.com','https://banapvs.com','https://49.13.235.6',null], // Allowed origin for production
    credentials: true, // Enable credentials like cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE','OPTIONS'], // Add allowed methods
  };
} else {
  corsOptions = {
    origin: '*', // Allow all origins for development
    credentials: true, // Enable credentials like cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE','OPTIONS'], // Add allowed methods
  };
}

// Apply CORS middleware
app.use(cors(corsOptions));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Security HTTP Headers
app.use(helmet());
app.use(compression());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from Same API (Configure rate limiting in express-rate-limit to use the correct IP source.)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  skip: (req, res) => {
    return true; // Always skip rate limiting, effectively making it infinite
  },
  keyGenerator: (req) => {
    return req.ip; // Use req.ip if not behind a proxy
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: options.message,
    });
  },
});
app.use(limiter); // Apply rate limiter to all routes

// Body parser, reading data from body into req.body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json()); // built-in middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['id'],
  })
);

// Test Middleware
app.use((req, res, next) => {
  req.requesttime = new Date().toLocaleString();
  next();
});


// #2 Routers
app.use('/api/v1/organization', organizationRoutes);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/paymentSetting', paymentSettingRouter);
app.use('/api/v1/payments', paymentRouter);

app.use('/api/ups', paymentRouter); // third Party Bank API

app.use('/api/v1/reset', paymentRouter); //reset all files

// Catch-all route handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
