module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'devolopment',
  DATABASE_URL: process.env.DATABASE_URL,
  API_TOKEN: process.env.API_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};
