const express = require('express');
const morgan = require('morgan');
const Log=require('./Middlware/logMiddlware')

const path = require('path');
const cors = require('cors');
const bodyparser=require('body-parser')
const cookieParser = require('cookie-parser');

const compression=require('compression')

const rateLimit=require('express-rate-limit')
const helmet=require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/errorController');

const organizationRoutes=require('./routes/organizationRouter')
const userRouter = require('./routes/userRouter');
const paymentSettingRouter = require('./routes/paymentSettingRouter');
const paymentRouter=require('./routes/paymentRouter');
//const smsRoutes=require('./routes/smsRoutes');

const app = express();//start Express app

app.enable('trust proxy');//Set trust proxy correctly based on whether your application is behind a proxy.

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// #1 Global Middlwares
//implement CORS
let corsOptions;
if (process.env.NODE_ENV === 'production') {
  corsOptions = {
    origin: 'http://49.13.235.6', // Allowed origin for production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable credentials like cookies
  };
} else if (process.env.NODE_ENV === 'development') {
  corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = ['http://49.13.235.6', 'http://localhost:5173'];
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests from listed origins or non-browser clients
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Enable credentials like cookies
  };
}

// Apply CORS middleware
app.use(cors(corsOptions));
// Handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Security HTTP Headers
app.use(helmet())

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from Same API (Configure rate limiting in express-rate-limit to use the correct IP source.)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",

  // Skip certain routes from being rate-limited
  // skip: (req, res) => req.path === '/skip-this-route',//not always skips

  skip: (req, res) => {
    return true; // Always skip rate limiting, effectively making it infinite
  },
  
  keyGenerator: (req) => {
    // Use req.ip if not behind a proxy
    return req.ip;
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: options.message,
    });
  },
});
app.use(limiter);// Apply rate limiter to all routes
// app.use(`/api`,limiter);// Apply rate limiter only to routes that start with '/api'


//Body parser ,reading data from body into req.body 
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json()); //built in middlware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['id']
  })
);


//Test Midlware
app.use((req, res, next) => {
  req.requesttime = new Date().toLocaleString();
  //console.log("RequestHeaders:",req.headers)
  // console.log("RequestTime:",req.requesttime);
  // console.log('Request Method:', req.method);
  // console.log('Request URL:', req.url);
  //console.log(req.cookies);
  next();
});

app.use(compression())

//#2 Routers
app.use('/api/v1/organization', organizationRoutes);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/paymentSetting',paymentSettingRouter);
app.use('/api/v1/payments',paymentRouter)


app.use('/api/ups',paymentRouter)//third Party Bank API

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
