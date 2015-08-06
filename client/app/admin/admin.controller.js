'use strict';

angular.module('oneDayJobApp')
    .controller('AdminCtrl', function($scope, $http, $mdDialog, Auth, User, Category, socket) {

        if (!Auth.isAdmin()) {
            document.location.href = '/';
        }

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
                .title('Would you like to delete user ' + user.lastName + '?')
                .ariaLabel('Delete user')
                .ok('Please do it!')
                .cancel('Don\'t do it')
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
            if (!category._id) {
                alert("You must refresh the page before deleting newly added categories!");
            } else {
                Category.remove({
                    id: category._id
                });
                $scope.categories.splice($scope.categories.indexOf(category), 1);
            }
        };

        $scope.addCat = function() {
            if ($scope.newCat === '') {
                return;
            }
            var newCategory = {
                name: $scope.newCat
            };
            var bb = false;
            for (var i in $scope.categories) {
                if ($scope.categories[i].name === $scope.newCat) {
                    bb = true;
                }
            }
            if (bb) {
                alert("You cannot add a category with an existing name!!!")
            } else {
                Category.save(newCategory);
                $scope.categories.push(newCategory);
            }
            $scope.newCat = '';
        }

    });