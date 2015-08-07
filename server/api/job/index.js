'use strict';

var express = require('express');
var controller = require('./job.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/userjob/:id', controller.myUserJob);
router.get('/userapplied/:id', controller.myUserApplied);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id',auth.isAuthenticated(), controller.addComment);
router.get('/searchTerm/:id', controller.searchTerm);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;