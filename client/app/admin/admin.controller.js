'use strict';

angular.module('oneDayJobApp')
    .controller('AdminCtrl', function($scope, $http, $mdDialog, Auth, User, Category, socket) {

        $scope.alert = '';
        $scope.showAlert = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('This is an alert title')
                .content('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };


        $scope.showConfirm = function(ev, user) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Would you like to delete your debt?')
                .content('All of the banks have agreed to forgive you your debts.')
                .ariaLabel('Lucky day')
                .ok('Please do it!')
                .cancel('Sounds like a scam')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                $scope.alert = 'You decided to get rid of your debt.';
                $scope.delete(user);
            }, function() {
                $scope.alert = 'You decided to keep your debt.';
            });
        };

        // Use the User $resource to fetch all users
        $scope.users = User.query();
        $scope.categories = Category.query();

        socket.syncUpdates('category', $scope.categories);

        $scope.newCat = '';

        $scope.delete = function(user) {
            if (user.role === 'admin') {
                window.alert("You cannot delete admin!!!");
            } else {

                User.remove({
                    id: user._id
                });
                angular.forEach($scope.users, function(u, i) {
                    if (u === user) {
                        $scope.users.splice(i, 1);
                    }
                });

            }
        }

        $scope.deleteCat = function(category) {
            Category.remove({
                id: category._id
            });
            $scope.categories = Category.query();
        };

        $scope.addCat = function() {
            if ($scope.newCat === '') {
                return;
            }
            Category.save({
                name: $scope.newCat
            });
            $scope.categories = Category.query();
            $scope.newCat = '';
        }

    });