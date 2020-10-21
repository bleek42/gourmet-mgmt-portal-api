/* eslint-disable no-console */
const knex = require('knex');
const { postgraphile } = require('postgraphile');
const app = require('./app');
const { NODE_ENV, PORT, DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.set('db', db);

app.use(postgraphile(DATABASE_URL, ['alcohol', 'employee', 'users', 'meat', 'produce'], {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
}));

app.listen(PORT, () => console.log(
  `Server listening in ${NODE_ENV} mode at http://localhost:${PORT}`,
));
