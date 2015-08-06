'use strict';

angular.module('oneDayJobApp')
    .factory('Category', function($resource) {
        return $resource('/api/categories/:id/:controller', {
            id: '@_id'
        }, {
            query: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },

        });
    });