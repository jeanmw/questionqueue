/*
 * DATABASE CONFIG
 */

var config    = require('./config'),
    mongoose  = require('mongoose');

module.exports = function() {
  var db = mongoose.connect(process.env.mongolab-rugged-78843 || 'mongodb://localhost/questionqueue');
  require('./models/post');
  require('./models/user');

  return db;
};
