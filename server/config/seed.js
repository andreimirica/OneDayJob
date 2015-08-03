'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');
var Job = require('../api/job/job.model');


Category.find({}).remove(function() {
    Category.create({
        name: 'Gradinarit'
    }, {
        name: 'Tamplarie'
    }, {
        name: 'Agricultura, pana mea'
    });
});

Job.find({}).remove(function() {
    Job.create({
        title: 'Sapator',
        description: 'Dat la sapa 100m garduri',
        owner: 'Eusebiu',
        location: 'Adjud',
        category: 'munca cu carca',
        helpers: '4',
        paycheck: '100',
        jobDate: '2011-07-14 19:43:37 +0100',
    });
});

Thing.find({}).remove(function() {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
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
    });
});