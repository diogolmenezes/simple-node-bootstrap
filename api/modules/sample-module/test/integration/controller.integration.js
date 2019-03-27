const { TestHelper } = require('simple-node-framework');
const supertest = require('supertest');
const { server } = require('../../../../../index');

describe('Controller', () => {
    before(() => {
        TestHelper.before();
    });

    after(() => {
        server.close();
    });

    it('Should return 404 if not find the customer', (done) => {
        supertest(server)
            .get('/api/sample-module/some-not-found-name')
            .set('x-origin-application', 'my-application')
            .set('x-origin-channel', 'unit-test')
            .expect(404)
            .end((err) => {
                if (err) throw err;
                done();
            });
    });
});
