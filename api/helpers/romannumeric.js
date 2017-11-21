class RomanNumeric {

    static getValues() {
        return [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    }

    static getNumerals() {
        return ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    }

    static getRomanDigits() {
        let values = RomanNumeric.getValues();
        let romanDigits = {};
        RomanNumeric.getNumerals().map((numeral, index) => {
            Object.assign(romanDigits, {
                [numeral]: values[index]
            });
        });
        return romanDigits;
    }

}

module.exports = RomanNumeric;