angular
    .module('romNumApp.controllers')
    .controller('HomeCtrl', HomeController);

HomeController.$inject = ['$scope', 'ConverterService'];

function HomeController($scope, ConverterService) {
    $scope.result = "";
    $scope.errorMsg = null;
    $scope.values = {
        numeric: 1,
        roman: "I"
    };

    $scope.toRoman = (form) => {
        if (form.$valid) {
            ConverterService
                .toRoman($scope.values.numeric)
                .$promise
                .then(data => {
                    $scope.clearError();
                    $scope.result = data.result;
                })
                .catch(err => {
                    $scope.errorMsg = {
                        message: err.data.message,
                        error: err.data.error
                    }
                });
        }
    };

    $scope.toNumeric = (form) => {
        if (form.$valid) {
            ConverterService
                .toNumeric($scope.values.roman)
                .$promise
                .then(data => {
                    $scope.clearError();
                    $scope.result = data.result;
                })
                .catch(err => {
                    $scope.errorMsg = {
                        message: err.data.message,
                        error: err.data.error
                    }
                });
        }
    };

    $scope.clearError = () => {
        $scope.errorMsg = null;
    }

}