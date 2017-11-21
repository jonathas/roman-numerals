const request = require('./common');

describe('# Converter', () => {

    const endpoint = process.env.API_BASE + 'converter';

    describe('# Roman to Numeric', () => {
        it('should convert from roman to numeric', () => {
            return request.get(`${endpoint}/tonumeric/II`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.result.should.equal(2))
                .expect(200);
        });

        it('should return bad request when trying to convert a non roman numerals value to numeric', () => {
            return request.get(`${endpoint}/tonumeric/anythingHere`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal('Please inform a value in roman numerals'))
                .expect(400)
                .then(res => {
                    return request.get(`${endpoint}/tonumeric/5`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(res => res.body.error.should.equal('Please inform a value in roman numerals'))
                        .expect(400);
                });
        });

        it('should return bad request if informed roman numerals value is out of allowed range', () => {
            return request.get(`${endpoint}/tonumeric/MV`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal('Please inform a value between I and MMMCMXCIX'))
                .expect(400);
        });
    });

    describe('# Numeric to Roman', () => {
        it('should convert from numeric to roman', () => {
            return request.get(`${endpoint}/toroman/2`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.result.should.equal('II'))
                .expect(200);
        });

        it('should return bad request when trying to convert a non numeric value to roman', () => {
            return request.get(`${endpoint}/toroman/anythingHere`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal('Please inform a numeric value'))
                .expect(400);
        });

        it('should return bad request if informed numeric value is out of allowed range', () => {
            return request.get(`${endpoint}/toroman/4000`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal('Please inform a value between 1 and 3999'))
                .expect(400)
                .then(res => {
                    return request.get(`${endpoint}/toroman/0`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(res => res.body.error.should.equal('Please inform a value between 1 and 3999'))
                        .expect(400);
                })
                .then(res => {
                    return request.get(`${endpoint}/toroman/-1`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(res => res.body.error.should.equal('Please inform a value between 1 and 3999'))
                        .expect(400)
                });
        });

    });

});