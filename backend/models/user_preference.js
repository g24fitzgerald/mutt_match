var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  userId: String,
  active: Boolean,
  lazy: Boolean,
  hypoalergenic: { type: Boolean, required: true},
  has_kids: Boolean,
  has_dogs: Boolean,
  has_cats: Boolean,
  home_size: String
});

var model = mongoose.model('Preference', schema);

// Make this available to our other files
module.exports = model;
