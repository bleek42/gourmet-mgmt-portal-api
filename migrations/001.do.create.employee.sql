CREATE TABLE employee (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  address VARCHAR(255),
  city VARCHAR(255),
  phone VARCHAR(255),
  department VARCHAR(255) 
);