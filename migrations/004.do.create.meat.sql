CREATE TABLE meat (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  price NUMERIC(10,2) NOT NULL,
  name VARCHAR(255) NOT NULL,
  quantity INTEGER
);