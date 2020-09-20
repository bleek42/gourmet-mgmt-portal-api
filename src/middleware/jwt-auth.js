const { JsonWebTokenError } = require('jsonwebtoken');

const AuthService = require('../routes/auth/auth-service');
const HttpException = require('../utils/http-exception');

const requireAuth = async (req, res, next) => {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer')) {
    throw new HttpException(401, 'Missing Token');
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken);
    const user = await AuthService.getUserName(req.app.get('db', payload.subject));
    if (!user) {
      throw new HttpException(401, 'Unauthorized Request');
    }
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw new HttpException(401, 'Unauthorized Request');
    }
    next(err);
  }
};

module.exports = requireAuth;
