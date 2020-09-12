const { expect, assert } = require('chai');
const supertest = require('supertest');


const app = require('../src/app');
const { API_TOKEN, TEST_URL } = require('../src/config');
const { createKnexInstance } = require('./test-helpers');

describe('alcohol endpoint', () => {
    let db;

    before('create knex instance', () => {
        db = createKnexInstance();
    })

    app.set('db', db);


    after('disconnect from db', () => db.destroy());

    it('should respond 401 unauthorized without API token', () => {
        return supertest(app)
            .get('/api/alcohol')
            .expect(401)
    });

    it('should respond 200 with all alcohol items', () => {
        return supertest(app)
            .get('/api/alcohol')
            .set('Authorization', `Bearer ${API_TOKEN}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).to.exist;
            })
    });

    it('should respond 200 with selected alcohol item by id', () => {
        return supertest(app)
            .get('/api/alcohol/1')
            .set('Authorization', `Bearer ${API_TOKEN}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).to.have.property('id')
            })
    })

});