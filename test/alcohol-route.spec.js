const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../src/app');
const { API_TOKEN } = require('../src/config');
const { createKnexInstance } = require('./test-helpers');

describe('alcohol endpoint', () => {
    let db;

    before('create knex instance', () => {
        db = createKnexInstance();
        app.set('db', db);
    })

    after('disconnect from db', () => db.destroy());

    it('should respond 401 unauthorized without API token', () => {
        return supertest(app)
            .get('/api/alcohol')
            .expect(401)
            .expect((res) => {
                expect(res.body).to.eql(401);
            })
    });

    it('should respond 200 with all alcohol options', () => {
        return supertest(app)
            .get('/api/alcohol')
            .set('Authorization', `Bearer ${API_TOKEN}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect((res) => {
                expect(res.body).to.exist;
            })
    });

});