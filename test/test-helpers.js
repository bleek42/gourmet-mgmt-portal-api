const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const { TEST_URL, JWT_SECRET } = require('../src/config');

class MockEmployee {
    constructor(id, name, age, address, city, phone, department) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
        this.city = city;
        this.phone = phone;
        this.department = department;
    }
}


const createKnexInstance = () => {
    return knex({
        client: 'pg',
        connection: TEST_URL
    })
}

module.exports = {
    MockEmployee,
    createKnexInstance
}