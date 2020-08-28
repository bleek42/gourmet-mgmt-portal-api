const HttpException = require('../utils/http-exception');

const errorHandler = (error = new HttpException(), req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).send(message);
  next();
};

module.exports = errorHandler;
