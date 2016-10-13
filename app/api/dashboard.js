const db = require('./../../db.js');
const _ = require('underscore');
let api = {};

api.getDashboard = function(req, res) {
  res.render('dashboard/index')
}

api.createUser = function(req, res) {
  var body = _.pick(req.body,  'name', 'email', 'img', 'password');
   db.admin.create(body).then(function(admin) {
       res.json(admin.toPublicJSON());
   }, function(e) {
       res.status(400).json(e);
   });
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
