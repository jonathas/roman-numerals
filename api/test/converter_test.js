const request = require('./common');

describe('# Converter', () => {

    const endpoint = process.env.API_BASE + 'converter';

    describe('# Roman to Numeric', () => {
        it('should convert from roman to numeric', () => {
            return request.get(`${endpoint}/tonumeric/II`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.result.should.equal(2))
                .expect(200)
                .then(res => {
                    return request.get(`${endpoint}/tonumeric/IX`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(res => res.body.result.should.equal(9))
                        .expect(200);
                });
        });

        it('should return bad request when trying to convert a non roman numerals value to numeric', () => {
            return request.get(`${endpoint}/tonumeric/anythingHere`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.message.should.equal('Please inform a value in roman numerals'))
                .expect(400)
                .then(res => {
                    return request.get(`${endpoint}/tonumeric/5`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(res => res.body.message.should.equal('Please inform a value in roman numerals'))
                        .expect(400);
                });
        });

        it('should not allow 4 consecutive numerals of the same kind', () => {
            return request.get(`${endpoint}/tonumeric/IIII`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal('There cannot be 4 consecutive numerals of the same kind'))
                .expect(400);
        });

        it('should not allow two V, L or D in the entire string', () => {
            const errorMsg = 'The letters V, L and D may only appear once in the entire Roman numeral string';
            return request.get(`${endpoint}/tonumeric/IVIV`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal(errorMsg))
                .expect(400)
                .then(res => {
                    return request.get(`${endpoint}/tonumeric/DCDC`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(res => res.body.error.should.equal(errorMsg))
                        .expect(400);
                })
                .then(res => {
                    return request.get(`${endpoint}/tonumeric/LMCL`)
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(res => res.body.error.should.equal(errorMsg))
                        .expect(400);
                });
        });

        it('should not allow a smaller digit than the next one', () => {
            return request.get(`${endpoint}/tonumeric/IIV`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal('A digit 1 cannot be smaller than the next digit 4'))
                .expect(400);
        });

        it('should not allow a previous diget to be bigger than the max digit in the string', () => {
            return request.get(`${endpoint}/tonumeric/MCMC`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(res => res.body.error.should.equal('The digit 100 cannot be bigger than the max digit 99'))
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
                .expect(res => res.body.message.should.equal('Please inform a numeric value'))
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
                        .expect(400);
                });
        });

    });

});