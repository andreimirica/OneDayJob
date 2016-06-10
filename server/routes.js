/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

    // Insert routes below
    app.use('/api/things', require('./api/thing'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/categories', require('./api/category'));
    app.use('/api/jobs', require('./api/job'));

    app.use('/api/states', require('./api/state'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            if(req.params['0']=='legeZilieri'){
                res.setHeader('Content-type', 'application/pdf');
                res.sendFile('/legeZilieri.pdf', {root: __dirname});
            } else {
                res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
            }
        });
};