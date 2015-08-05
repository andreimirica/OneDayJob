'use strict';

angular.module('oneDayJobApp')
    .factory('Job', function($resource) {
        return $resource('/api/jobs/:id/:controller', {
            id: '@_id'
        }, {
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },
        });
    });