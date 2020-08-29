require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const authRouter = require('./routes/auth/auth-route');
const employeeRouter = require('./routes/employee/employee-route');
const alcoholRouter = require('./routes/alcohol/alcohol-route');

const errorHandler = require('./middleware/error-handler');
const validateToken = require('./middleware/validate-token');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

// set up middleware
app.use(morgan(morganOption));

app.use(helmet());
app.use(cors());
app.use(validateToken);

app.use(express.json());

// app.use('/api', authRouter);
app.use('/api', employeeRouter);
app.use('/api', alcoholRouter);

app.use(errorHandler);

module.exports = app;
