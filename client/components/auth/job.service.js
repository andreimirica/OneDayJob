'use strict';

angular.module('oneDayJobApp')
    .factory('Job', function($resource) {
        return $resource('/api/jobs/:id/:attribute', {
            id: '@_id'
        }, 
        {
        	addComment:{
        		method: 'PUT',
                params: {
                	id:'@_id',
                    attribute : "comments"
                    
                }
        	},
            confirmApplicants:{
                method:'PUT',
                params:{
                    id:'@_id',
                }
            }
        }
        );
    });