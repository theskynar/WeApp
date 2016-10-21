const db = require('./../../db.js');
const _ = require('underscore');
var api = {};

api.getDashboard = function(req, res) {
  res.render('dashboard/index')
}

api.getAllAdmins = function(req, res) {
  db.admin.findAll().then(function (admins) {
    if(!!admins) {
      res.json(admins);
    } else {
      res.status(404).send('Not found');
    }
  }, function (e) {
      res.status(500).send(e);
  });
}

api.getAdminById = function (req, res) {
  var id = parseInt(req.params.id, 10);
  db.admin.findOne({
    where: {
      id: id
    }
  }).then(function (admin) {
      if(!!admin) {
        res.status(200).send(admin);
      } else {
        res.status(404).send('Not Found')
      }
  }, function(err) {
      res.status(500).send(err);
  })
}

api.createAdmin = function(req, res) {
  var body = _.pick(req.body,  'name', 'email', 'img', 'password');
   db.admin.create(body).then(function(admin) {
       res.json(admin);
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
