const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Employee {
  id: Int!
  name: String!
  age: Int
  address: String
  city: String
  phone: String
  department: String
}

type Alcohol {
  id: Int!
  type: String!
  price: Float!
  name: String!
  quantity: Int!
}

type Produce {
  id: Int!
  price: Int!
  name: String!
  quantity: String!
}

type Meat {
  id: Int!
  price: Float!
  name: String!
  quantity: Int!
}

type User {
  id: Int!
  username: String!
  email: String!
  password: String!
}

type Query {
  employees: [Employee]!
  alcohol: [Alcohol]!
  produce: [Produce]!
  meat: [Meat]!
  user(id: Int!): User
}
`;

module.exports = typeDefs;
