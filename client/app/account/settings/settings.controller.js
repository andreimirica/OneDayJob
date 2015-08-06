'use strict';

angular.module('oneDayJobApp')
    .controller('SettingsCtrl', function($scope, User, Auth) {
        $scope.errors = {};
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.changePassword = function(form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function() {
                        $scope.message = 'Password successfully changed.';
                    })
                    .catch(function() {
                        form.firstName.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect password';
                        $scope.message = '';
                    });
                      Auth.changePhone($scope.user.oldPhone, $scope.user.newPhone)
                    .then(function() {
                        $scope.message = 'Phone successfully changed.';
                    })
                    .catch(function() {
                        form.firstName.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect phone';
                        $scope.message = '';
                    });
            }
        };
    });