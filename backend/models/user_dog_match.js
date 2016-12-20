var mongoose = require('mongoose');

var schema = new mongoose.Schema({
});

var model = mongoose.model('Playlist', schema);

// Make this available to our other files
module.exports = model;
