// Packages
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Initialiaze app
const app = express();

// FORMAT FOR MORGAN LOGGING
// Your request will be logged in this format after it sends a response
const MORGAN_REQ_LOG_FORMAT =
  ':correlationId[:date[clf]] :method :url :status :res[content-length] - :response-time ms';

// Set up for Correlation Id
// this is a unique id for every request
morgan.token('correlationId', (req, res) => {
  const correlationId = res.correlationId;
  if (correlationId) return `(${correlationId})`;
  return ' ';
});

// Middlewares
// Standard express js practices
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use(helmet());
app.use(morgan(MORGAN_REQ_LOG_FORMAT));
app.use(express.json());

// Routes imports
const v1Routes = require('./routes/v1');
// If you ever decide to make v2 for your api you can set it up like this
//const v2Routes = require('./routes/v2');

// Routes
app.use('/v1', v1Routes);
// If you ever decide to make v2 for your api you can set it up like this
//app.use('/v2', v2Routes);

// A root route to check whether your service is running or not
app.get('/', (_, res) => {
  // You can also use our response abstractions from response.js
  res.status(200).send('Node service up and running ');
});

app.get('/healthcheck', (_, res) => {
  try {
    // Here you can perform any checks which will assure you that your service is running perfectly
    // For e.g. you can verify your db connection, redis connection etc
    // You can also use our response abstractions from response.js
    res.status(200).send('Service running perfectly');
  } catch (err) {
    // You can also use our response abstractions from response.js
    res.status(500).send("Couldn't perform healthcheck");
  }
});

module.exports = app;
