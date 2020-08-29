module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'devolopment',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://postgres:leekster@localhost/restaurant',
  API_TOKEN: process.env.API_TOKEN || '9cc7e1bb-fd93-43f9-85c3-9936e179de2b',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};
