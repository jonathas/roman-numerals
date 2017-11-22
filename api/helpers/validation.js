const { validationResult } = require('express-validator/check');
const RomanNumeric = require('./romannumeric');

class Validation {

    static romanToNumeric(req) {
        validationResult(req).throw();

        let value = req.params.value.toUpperCase().trim();

        Validation.checkCharsAreNumerals(value);
        Validation.checkConsecutiveNumerals(value);
        Validation.checkRepeatedNumerals(value);
    }

    static numericToRoman(req) {
        validationResult(req).throw();

        if (req.params.value <= 0 || req.params.value > 3999) {
            throw new Error('Please inform a value between 1 and 3999');
        }
    }

    static checkCharsAreNumerals(value) {
        let numerals = RomanNumeric.getNumerals();
        let shouldntBeHere = value.split('').filter(char => numerals.indexOf(char) === -1);

        if (shouldntBeHere.length) {
            throw new Error(`These characters are not numerals: ${shouldntBeHere.toString()}`);
        }
    }

    static checkConsecutiveNumerals(value) {
        let chars = [];

        if (Array.isArray(value)) {
            chars = value;
        } else {
            chars = value.split('');
        }

        let count = 1;
        let last = 'Z';

        for (let numeral of chars) {
            if (numeral === last) {
                count++;
                if (count === 4) throw new Error('There cannot be 4 consecutive numerals of the same kind');
            } else {
                count = 1;
                last = numeral;
            }
        }
    }

    // Letters V, L and D may only appear once in the entire Roman numeral string
    static checkRepeatedNumerals(value) {
        if (value.split('V').length > 2 || value.split('L').length > 2 || value.split('D').length > 2) {
            throw new Error('The letters V, L and D may only appear once in the entire Roman numeral string');
        }
    }

    static checkDigitBiggerThanMax(digit, maxDigit) {
        if (digit > maxDigit) {
            throw new Error(`The digit ${digit} cannot be bigger than the max digit ${maxDigit}`);
        }
    }

    static checkValueSmallerThanNext(values) {
        for (let i = 0; i < values.length - 1; i++) {
            if (values[i] < values[i + 1]) {
                throw new Error(`A digit ${values[i]} cannot be smaller than the next digit ${values[i+1]}`);
            }
        }
    }

}

module.exports = Validation;