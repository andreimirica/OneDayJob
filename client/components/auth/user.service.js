'use strict';

angular.module('oneDayJobApp')
    .factory('User', function($resource) {
        return $resource('/api/users/:id/:controller', {
            id: '@_id'
        }, {
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
            },
            changeFirstName: {
                method: 'PUT',
                params: {
                    controller: 'firstName'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },
            getUserComments: {
                method: 'GET',
                params: {
                    id: '@_id'
                }
            }
        });
    });