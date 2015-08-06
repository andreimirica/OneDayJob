'use strict';

var express = require('express');
var controller = require('./job.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id',controller.addComment);

module.exports = router;