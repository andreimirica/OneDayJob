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
            }
        });
    })
    .factory('JobLocation', function($resource) {
        return $resource('/api/jobs/addPlace/:id', {
            id: '@_id'
        }, {
            setPlace: {
                method: 'PUT',
                params: {
                    id: '@_id'
                }
            }
        });
    });