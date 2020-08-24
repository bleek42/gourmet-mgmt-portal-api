const logger = require('./logger');
const { API_TOKEN } = require('../config');

const validateToken = (req, res, next) => {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized Request: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized Request' });
  }
  next();
};

module.exports = validateToken;
