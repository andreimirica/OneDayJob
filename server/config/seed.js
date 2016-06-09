'use strict';

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Category = require('../api/category/category.model');
var Job = require('../api/job/job.model');
var State = require("../api/state/state.model");



Category.find({}).remove(function() {
    Category.create({
        name: 'Gradinarit'
    }, {
        name: 'Tamplarie'
    }, {
        name: 'Agricultura'
    });
});

Job.find({}).remove(function() {
    Job.create({
        title: 'Sapator',
        description: 'Dat la sapa 100m garduri',
        owner: 'ion@ion.com',
        location: 'Adjud',

        category: 'Gradinarit',
        helpers: '4',
        paycheck: '100',
        jobDate: '2016-07-23 19:43:37 +0100',
        applicants: ['test@test.com']
    }, {
        title: 'Tamplar',
        description: 'Dat la dalta, 20cm rumegus',
        owner: 'test@test.com',
        location: 'Cluj',
        category: 'Tamplarie',
        helpers: '1',
        paycheck: '10',
        jobDate: '2016-07-22 19:43:37 +0100',
        applicants: ['ion@ion.com']
    },
    {
        title: 'Muncitor',
        description: 'Dat la grebla',
        owner: 'ion@ion.com',
        location: 'Adjud',
        category: 'Tamplarie',
        helpers: '3',
        paycheck: '400',
        jobDate: '2016-07-10 19:43:37 +0100',
        applicants: []
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
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        password: 'test',
        phone: '2939-231-231',
        state: 'Bihor'
    }, {
        provider: 'local',
        firstName: 'Admin',
        lastName: 'Adminescu',
        role: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        phone: 'xxxx-xxx-xxx',
        state: ''
    }, {
        provider: 'local',
        firstName: 'Ion',
        lastName: 'Ionescu',
        email: 'ion@ion.com',
        password: 'ion',
        phone: '0838-234-213',
        state: 'Ialomita'
    }, function() {
        console.log('finished populating users');
    });
});

State.find({}).remove(function() {
    State.create({
        stateName: "Alba"
    }, {
        stateName: "Arad"
    }, {
        stateName: "Arges"
    }, {
        stateName: "Bacau"
    }, {
        stateName: "Bihor"
    }, {
        stateName: "Bistrita Nasaud"
    }, {
        stateName: "Botosani"
    }, {
        stateName: "Brasov"
    }, {
        stateName: "Braila"
    }, {
        stateName: "Bucuresti"
    }, {
        stateName: "Buzau"
    }, {
        stateName: "Caras Severin"
    }, {
        stateName: "Calarasi"
    }, {
        stateName: "Cluj"
    }, {
        stateName: "Constanta"
    }, {
        stateName: "Covasna"
    }, {
        stateName: "Dambovita"
    }, {
        stateName: "Dolj"
    }, {
        stateName: "Galati"
    }, {
        stateName: "Giurgiu"
    }, {
        stateName: "Gorj"
    }, {
        stateName: "Harghita"
    }, {
        stateName: "Hunedoara"
    }, {
        stateName: "Ialomita"
    }, {
        stateName: "Iasi"
    }, {
        stateName: "Ilfov"
    }, {
        stateName: "Maramures"
    }, {
        stateName: "Mehedinti"
    }, {
        stateName: "Mures"
    }, {
        stateName: "Neamt"
    }, {
        stateName: "Olt"
    }, {
        stateName: "Prahova"
    }, {
        stateName: "Satu Mare"
    }, {
        stateName: "Salaj"
    }, {
        stateName: "Sibiu"
    }, {
        stateName: "Suceava"
    }, {
        stateName: "Teleorman"
    }, {
        stateName: "Timis"
    }, {
        stateName: "Tulcea"
    }, {
        stateName: "Vaslui"
    }, {
        stateName: "Valcea"
    }, {
        stateName: "Vrancea"
    }, function() {
        console.log('finished populating states');
    })
});
