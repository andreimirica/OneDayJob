/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /jobs              ->  index
 * POST    /jobs              ->  create
 * GET     /jobs/:id          ->  show
 * PUT     /jobs/:id          ->  update
 * DELETE  /jobs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var job = require('./job.model');

// Get list of jobs
exports.index = function(req, res) {
  job.find(function (err, jobs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(jobs);
  });
};

// Get a single job
exports.show = function(req, res) {
  job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.status(404).send('Not Found'); }
    return res.json(job);
  });
};

// Creates a new job in the DB.
exports.create = function(req, res) {
  job.create(req.body, function(err, job) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(job);
  });
};

// Updates an existing job in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  job.findById(req.params.id, function (err, job) {
    if (err) { return handleError(res, err); }
    if(!job) { return res.status(404).send('Not Found'); }
    var updated = _.merge(job, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(job);
    });
  });
};

// Deletes a job from the DB.
exports.destroy = function(req, res) {
  job.findById(req.params.id, function (err, job) {
    if(err) { return handleError(res, err); }
    if(!job) { return res.status(404).send('Not Found'); }
    job.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}