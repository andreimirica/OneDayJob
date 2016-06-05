'use strict';

angular.module('oneDayJobApp')
    .controller('SettingsCtrl', function($scope, User, Auth, Upload) {
        $scope.errors = {};
        $scope.getCurrentUser = Auth.getCurrentUser();
        $scope.user={};
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
            }
        };

        $scope.upload = function (file) {
            if(file){
                Upload.base64DataUrl(file).then(function(url){
                    $scope.imageEncoded = url;
                    $scope.getCurrentUser.photo = $scope.imageEncoded;
                });
            } else {
                alert('No File Selected!');
            }
        };

         $scope.changeFirstName = function(form) {
            $scope.submitted = true;
                Auth.changeFirstName($scope.getCurrentUser.photo, $scope.getCurrentUser.firstName,$scope.getCurrentUser.lastName,$scope.getCurrentUser.phone)
                    .then(function() {
                        $scope.message = 'Successfully changed!';
                    })
                    .catch(function() {
                        form.firstName.$setValidity('mongoose', false);
                        $scope.errors.other = 'Incorrect firstName';
                        $scope.message = '';
                    });
            };

    });