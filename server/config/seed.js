/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Job = require('../api/job/job.model');

Job.find({}).remove(function() {
    Job.create({
      Title: 'Development Tools',
      Description:'How turn on computer. Halp!',
      Location : "Bucuresti",
    	StartDate : "2015-07-02",
    	EndDate : "2015-07-02",
    	PayRange :56,
    	NumberOfHelpers : 1,
    	PostStartDate : "2015-5-12",
    	PostEndDate : "2015-10-23",
    	Owner:"Gica",
    	Category:"Not safe"
    }, 
    {
      Title: 'Server and Client integration',
      Description:'Descriere sugestiva',
      Location : "Cluj",
    	StartDate : "2010-08-04",
    	EndDate : "2004-03-07",
    	PayRange : 100,
    	NumberOfHelpers : 3,
    	PostStartDate : "2015-02-23",
    	PostEndDate : "2003-05-23",
    	Owner:"Mihaita",
    	Category:"Sapat"
    });
});



Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});