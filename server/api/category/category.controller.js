'use strict';

var _ = require('lodash');
var Category = require('./category.model');

// Get list of categories
exports.index = function (req, res) {
    Category.find(function (err, categories) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(categories);
    });
};

// Get a single category
exports.show = function(req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) { return handleError(res, err); }
        return res.json(category);
    });
};

// Create a new category in the DB
exports.create = function(req, res) {
    Category.create(req.body, function(err, category) {
        if (err) { return handleError(res, err); }
        return res.status(201).json(category);
    });
};

// Deletes a category from the DB
exports.destroy = function(req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) { return handleError(res, err); }
        if (!category) { return res.status(404).send('Not Found'); }
        category.remove(function(err) {
            if (err) { return handleError(res, err); }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}