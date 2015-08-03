'use strict';

var category = require('./category.model');

exports.register = function(socket) {
    category.schema.post('save', function(doc) {
        onSave(socket, doc);
    });
    category.schema.post('remove', function(doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('category:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('category:remove', doc);
}