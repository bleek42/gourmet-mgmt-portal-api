const HttpException = require('../utils/http-exception');

const errorHandler = (error, req, res, next) => {
  error = new HttpException();
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(status).send(message);
  next();
};

module.exports = errorHandler;
