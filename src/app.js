require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

const authRouter = require('./routes/auth/auth-route');
const employeeRouter = require('./routes/employee/employee-route');
const alcoholRouter = require('./routes/alcohol/alcohol-route');
const produceRouter = require('./routes/produce/produce-route');
const meatRouter = require('./routes/meat/meat-route');
const usersRouter = require('./routes/users/users-route');

const validateToken = require('./middleware/validate-token');
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}));

// set up middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(validateToken);

app.use('/api', authRouter);
app.use('/api', employeeRouter);
app.use('/api', alcoholRouter);
app.use('/api', produceRouter);
app.use('/api', meatRouter);
app.use('/api', usersRouter);

app.use(errorHandler);

module.exports = app;
