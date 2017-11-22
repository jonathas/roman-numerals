const Validation = require('../helpers/validation');
const RomanNumeric = require('../helpers/romannumeric');

class Converter {

    romanToNumeric(req, res) {
        try {
            Validation.romanToNumeric(req);

            let maxDigit = 1000;
            let values = [];
            let ptr = 0;
            let roman = req.params.value.toUpperCase().trim().split('');
            const romanDigits = RomanNumeric.getRomanDigits();

            while (ptr < roman.length) {
                let numeral = roman[ptr];
                let digit = romanDigits[numeral];

                Validation.checkDigitBiggerThanMax(digit, maxDigit);

                let nextDigit = 0;
                if (ptr < roman.length - 1) {
                    let nextNumeral = roman[ptr + 1];
                    let nextDigit = romanDigits[nextNumeral];

                    if (nextDigit > digit) {
                        Validation.checkCharsAreNumerals(numeral);
                        Validation.checkDigitBiggerThanMax(nextDigit, digit * 10);
                        Validation.checkConsecutiveNumerals(roman);

                        maxDigit = digit - 1;
                        digit = nextDigit - digit;
                        ptr++;
                    }
                }

                values.push(digit);

                ptr++;
            }

            Validation.checkValueSmallerThanNext(values);

            let total = values.reduce((previous, current) => previous + current);

            res.status(200).json({ result: total });
        } catch (err) {
            res.status(400).json({ message: 'Please inform a value in roman numerals', error: err.message });
        }
    }

    numericToRoman(req, res) {
        try {
            Validation.numericToRoman(req);

            let number = req.params.value;
            const values = RomanNumeric.getValues();
            const numerals = RomanNumeric.getNumerals();
            let romanValues = [];

            for (let i = 0; i < numerals.length; i++) {
                while (number >= values[i]) {
                    number -= values[i];
                    romanValues.push(numerals[i]);
                }
            }

            res.status(200).json({ result: romanValues.join('') });
        } catch (err) {
            res.status(400).json({ message: 'Please inform a numeric value', error: err.message });
        }
    }

}

exports.default = new Converter();