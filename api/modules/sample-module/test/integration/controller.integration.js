const { TestHelper } = require('simple-node-framework');
const supertest = require('supertest');
const { server } = require('../../../../../app');

describe('Customer', () => {
    before(() => {
        TestHelper.before();
    });

    after(() => {
        server.close();
    });

    it('Must return 404 if customer not found', (done) => {
        supertest(server)
            .get('/api/sample-module/customer-name')
            .set('x-origin-application', 'my-application')
            .set('x-origin-channel', 'my-channel')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImxvZ2luIjoiZGlvZ28ubGVpdGFvQG9pLm5ldC5iciIsInBlcmZpbCI6ImFkbWluIn0sImlhdCI6MTUxMDQ1NTg3MX0.q8ZxxZ893JGi490N0FAFrFAaNNl6TDloagprfMBUDNo')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err) => {
                if (err) throw err;
                done();
            });
    });
});
