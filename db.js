/*
 * DATABASE CONFIG
 */

var config    = require('./config'),
    mongoose  = require('mongoose');

module.exports = function() {
  var db = mongoose.connect('mongodb://heroku_rqvgd2cn:h3khca8db7abn21h4hn47657kq@ds127731.mlab.com:27731/heroku_rqvgd2cn' || 'mongodb://localhost/questionqueue');
  require('./models/post');
  require('./models/user');

  return db;
};
