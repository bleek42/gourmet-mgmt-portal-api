class HttpException extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message,
  });
};

module.exports = {
  HttpException,
  errorHandler,
};
