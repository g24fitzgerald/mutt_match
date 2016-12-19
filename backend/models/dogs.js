var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  active: { type: Boolean, required: true},
  lazy: { type: Boolean, required: true},
  hypoalergenic: { type: Boolean, required: true},
  good_with_kids: Boolean,
  good_with_dogs: Boolean,
  good_with_cats: Boolean,
  size: { type: String, required: true}
});

var model = mongoose.model('Dog', schema);

// Make this available to our other files
module.exports = model;