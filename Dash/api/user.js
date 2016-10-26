const jwt = require('jsonwebtoken');
const _ = require('underscore');
const db = require('./../../db.js');

module.exports = function(app){

  var api = {};

  api.createUser = function(req, res) {
    var body = _.pick(req.body,  'name', 'email', 'img', 'password');
     db.admin.create(body).then(function(admin) {
         res.json(admin.toPublicJSON());
     }, function(e) {
         res.status(400).json(e);
     });
  }

  api.update = function(req, res) {
    var id = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'name', 'email', 'img');
    var where = {};
    var adminInstance;

    if(body.hasOwnProperty('name')) where.name = body.name;
    if(body.hasOwnProperty('email')) where.email = body.email;
    if(body.hasOwnProperty('img')) where.img= body.img; 

    db.admin.findOne({
      where: {
        id: id
      }
    }).then(function (admin) {
      if(admin) {
        admin.update(where).then(function (admin) {
          console.log(admin.toPublicJSON());
            res.status(200).json(admin);
        }).catch(function (err) {
            res.status(400).send(err);
        });
      } else {
        res.status(404).send();
      }
    }).catch(function (err) {
        res.status(500).send(err);
    });
  }


  api.list = function(req, res) {
    db.admin.findAll({attributes: ['id', 'name', 'email', 'img', 'createdAt', 'updatedAt']}).then(function (admins) {
      if(!!admins) return res.json(admins);
        res.status(404).send('Not found');
    }, function (e) {
        res.status(500).send(e);
    });
  }

  api.getUserById = function (req, res) {
    var id = parseInt(req.params.id, 10);
    db.admin.findOne({
      where: {
        id: id
      },
      attributes: {
        exclude: ['passwordHashed', 'salted']
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

  return api;
}
