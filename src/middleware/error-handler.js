const { NODE_ENV } = require('../config');

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const response = (NODE_ENV === 'production') ? { error: 'Internal Server error' } : { error: err.message };
  // console.trace(req, res, err, err.message);
  return res.status(500).json(response);
};

module.exports = errorHandler;
