'use strict';

var _ = require('lodash');
var State = require('./state.model');

exports.index = function(req, res) {
    State.find(function(err, states) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(states);
    });
};

exports.create = function(req, res) {
    State.create(req.body, function(err, state) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(state);
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}