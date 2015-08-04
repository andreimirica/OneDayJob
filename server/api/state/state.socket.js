/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var state = require('./state.model');

exports.register = function(socket) {
    state.schema.post('save', function(doc) {
        onSave(socket, doc);
    });
    state.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('state:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('state:remove', doc);
}