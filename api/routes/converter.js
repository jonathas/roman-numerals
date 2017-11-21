const { check } = require('express-validator/check');
const RomanNumeric = require('../helpers/romannumeric');
const Converter = require('../controllers/converter').default;

module.exports = (app) => {

    const endpoint = process.env.API_BASE + 'converter';

    /**
     * @api {get} /api/v1/converter/tonumeric/:value Returns the number in numeric format
     * @apiVersion 1.0.0
     * @apiName romanToNumeric
     * @apiGroup Converter
     * @apiPermission public
     *
     * @apiParam {String} value The value in roman numerals
     *
     * @apiExample {js} Example usage:
     * $http.get(url + "/II")
     *   .success((res, status) => doSomethingHere())
     *   .error((err, status) => doSomethingHere());
     *
     * @apiSuccess {Number} result The conversion result
     *
     * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "result": 2
     *      }
     *
     */
    app.get(endpoint + '/tonumeric/:value', [
        check('value').isAlpha()
    ], Converter.romanToNumeric);

    /**
     * @api {get} /api/v1/converter/toroman/:value Returns the number in roman format
     * @apiVersion 1.0.0
     * @apiName numericToRoman
     * @apiGroup Converter
     * @apiPermission public
     *
     * @apiParam {String} value The value in numeric format
     *
     * @apiExample {js} Example usage:
     * $http.get(url + "/2")
     *   .success((res, status) => doSomethingHere())
     *   .error((err, status) => doSomethingHere());
     *
     * @apiSuccess {String} result The conversion result
     *
     * @apiSuccessExample {json} Success response:
     *     HTTPS 200 OK
     *     {
     *      "result": "II"
     *      }
     *
     */
    app.get(endpoint + '/toroman/:value', [
        check('value').isNumeric()
    ], Converter.numericToRoman);

}