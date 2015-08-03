'use strict';

angular.module('oneDayJobApp')
    .controller('SignupCtrl', function($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};

        $scope.register = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                        firstName: $scope.user.firstName,
                        lastName:$scope.user.lastName,
                        email: $scope.user.email,
                        password: $scope.user.password,
                        phone:$scope.user.phone,
                        state:$scope.user.state

                    })
                    .then(function() {
                        // Account created, redirect to home
                        $location.path('/');
                    })
                    .catch(function(err) {
                        err = err.data;
                        $scope.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
            }
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };

        $scope.states = [
            "Alba",
            "Arad",
            "Arges",
            "Bacau",
            "Bihor",
            "Bistrita Nasaud",
            "Botosani",
            "Brasov",
            "Braila",
            "Bucuresti",
            "Buzau",
            "Caras Severin",
            "Calarasi",
            "Cluj",
            "Constanta",
            "Covasna",
            "Dambovita",
            "Dolj",
            "Galati",
            "Giurgiu",
            "Gorj",
            "Harghita",
            "Hunedoara",
            "Ialomita",
            "Iasi",
            "Ilfov",
            "Maramures",
            "Mehedinti",
            "Mures",
            "Neamt",
            "Olt",
            "Prahova",
            "Satu Mare",
            "Salaj",
            "Sibiu",
            "Suceava",
            "Teleorman",
            "Timis",
            "Tulcea",
            "Vaslui",
            "Valcea",
            "Vrancea"
        ];
    });