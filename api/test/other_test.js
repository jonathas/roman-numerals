const request = require('./common');

describe('# Not configured routes', () => {
    it('should return 404', () => {
        return request.get('/aRandomEndpoint')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => res.body.error.should.equal('Endpoint not found'))
            .expect(404);
    });
});