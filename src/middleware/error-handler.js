const errorHandler = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    message,
  });
};

module.exports = {
  errorHandler,
};
