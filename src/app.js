require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const authRouter = require('./routes/auth/auth-router');
const employeeRouter = require('./routes/employee/employee-route');
const usersRouter = require('./routes/users/users-router');

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

app.use('/api/employees', employeeRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

module.exports = app;
