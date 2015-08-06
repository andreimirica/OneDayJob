'use strict';

angular.module('oneDayJobApp')
    .factory('Job', function($resource) {
        return $resource('/api/jobs/:id/:controller', {
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