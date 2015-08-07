'use strict';

var express = require('express');
var controller = require('./job.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/userjob/:id', controller.myUserJob);
router.get('/userapplied/:id', controller.myUserApplied);
router.post('/', controller.create);
router.put('/:id/comments',controller.addComment);
router.put('/:id',controller.confirmApplicants);

module.exports = router;