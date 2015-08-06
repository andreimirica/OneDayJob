'use strict';

angular.module('oneDayJobApp')
    .factory('Job', function($resource) {
        return $resource('/api/jobs/:id/:controller', {
            id: '@_id'
        }, {
        	addComment:{
        		method: 'PUT',
                params: {
                	id:'@_id',
                    
                }
        	}
        }
        );
    });