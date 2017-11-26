angular
    .module('romNumApp.services')
    .service('ConverterService', ConverterService);

ConverterService.$inject = ['ConverterModel'];

function ConverterService(ConverterModel) {
    this.toNumeric = function (value) {
        return ConverterModel.toNumeric({value: value});
    };

    this.toRoman = function (value) {
        return ConverterModel.toRoman({value: value});
    };
}