angular
    .module('romNumApp.models')
    .factory('ConverterModel', ConverterModel);

ConverterModel.$inject = ['$resource'];

function ConverterModel($resource) {
    return $resource('/api/v1/converter/:method/:value', {
        method: '@method',
        value: '@value'
    }, {
        toRoman: {
            method: 'GET',
            url: '/api/v1/converter/toroman/:value'
        },
        toNumeric: {
            method: 'GET',
            url: '/api/v1/converter/tonumeric/:value'
        }

    });
}