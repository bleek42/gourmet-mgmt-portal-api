require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');
const employeeRouter = require('./routes/employee-route');

const errorHandler = require('./middleware/error-handler');
const validateToken = require('./middleware/validate-token');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

// set up middleware
app.use(morgan(morganOption));

app.use(helmet());
app.use(cors());
app.use(validateToken);

app.use('/api', employeeRouter);

app.use(errorHandler);

module.exports = app;
