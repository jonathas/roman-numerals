const { validationResult } = require('express-validator/check');
const RomanNumeric = require('./romannumeric');

class Validation {

    static romanToNumeric(req) {
        validationResult(req).throw();

        let numerals = RomanNumeric.getNumerals();

        let shouldntBeHere = req.params.value.split('').filter(char => numerals.indexOf(char) === -1);

        if (shouldntBeHere.length) {
            throw new Error(`These characters are not numerals: ${shouldntBeHere.toString()}`);
        }
    }

    static numericToRoman(req) {
        validationResult(req).throw();

        if (req.params.value <= 0 || req.params.value > 3999) {
            throw new Error('Please inform a value between 1 and 3999');
        }
    }

}

module.exports = Validation;