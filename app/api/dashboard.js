const db = require('./../../db.js');
const _ = require('underscore');
var api = {};

api.getDashboard = function(req, res) {
  res.render('dashboard/index')
}

api.logout = function(req, res) {
  req.session.destroy(function(err){
    if(err) {
      res.send(err);
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    }
  });
}

module.exports = api;
