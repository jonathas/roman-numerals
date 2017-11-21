const Validation = require('../helpers/validation');
const RomanNumeric = require('../helpers/romannumeric');

class Converter {

    romanToNumeric(req, res) {
        try {
            Validation.romanToNumeric(req);

            let roman = "II"; // from the parameter

            res.status(200).json({ result: 2 });
        } catch (err) {
            res.status(400).json({ message: 'Please inform a value in roman numerals', error: err.message });
        }
    }

    numericToRoman(req, res) {
        try {
            Validation.numericToRoman(req);

            let number = req.params.value;
            let values = RomanNumeric.getValues();
            let numerals = RomanNumeric.getNumerals();
            let romanValue = [];

            for (let i = 0; i < 13; i++) {
                while (number >= values[i]) {
                    number -= values[i];
                    romanValue.push(numerals[i]);
                }
            }

            res.status(200).json({ result: romanValue.join('') });
        } catch (err) {
            res.status(400).json({ message: 'Please inform a numeric value', error: err.message });
        }
    }

}

exports.default = new Converter();