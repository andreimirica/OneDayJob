'use strict';

angular.module('oneDayJobApp')
	.factory("taskFactory" , function(){
		var tasks = [
	      {
	        title :"Title 1",
	        description :"Description 1",
	        participants : 1,
	        date : new Date(2016,6,13),
	        reward : 100
	      },
	      {
	        title :"Title 2",
	        description :"Description 2",
	        participants : 12,
	        date : new Date(2013,2,24),
	        reward : 200
	      },
	      {
	        title :"Title 3",
	        description :"Description 3",
	        participants : 3,
	        date : new Date(2015,1,3),
	        reward : 300
	      },
	      {
	        title :"Title 4",
	        description :"Description 4",
	        participants : 4,
	        date : new Date(2012,10,4),
	        reward : 400
	      }
	    ];

	    var factory = {};
	    factory.getTasks = function (){
	    	return tasks;
	    }

	    return factory;
	});