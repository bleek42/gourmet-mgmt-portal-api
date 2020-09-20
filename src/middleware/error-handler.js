const { NODE_ENV } = require('../config');
const HttpException = require('../utils/http-exception');

// const errorHandler = (err, req, res, next) => {
//   if (err instanceof HttpException) {
//     return res.status(err.status).json(err.message);
//   }

//   return res.status(500).send('Internal Server Error!');
// };

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const response = (NODE_ENV === 'production') ? { error: 'Internal Server error' } : { error: err.message };
  // console.trace(req, res, err, err.message);
  return res.status(500).json(response);
}

module.exports = errorHandler;
