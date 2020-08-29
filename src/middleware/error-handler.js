const errorHandler = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'Error',
    statusCode,
    message,
  });
};

module.exports = {
  errorHandler,
};
