const jwt = require('jsonwebtoken');
const _ = require('underscore');
const db = require('./../../db.js');

module.exports = function(app){
  var api = {};

  api.autenticaLogin = function(req, res) {
    var body = _.pick(req.body, 'email', 'password');
    var adminInstance;
    db.admin.verificar(body).then(function (admin) {
      if(!admin) {
        console.log('Não Autorizado!');
      } else {
        var token = jwt.sign(admin.email , app.get('secret'));
        res.set('x-access-token', token);
        res.json(admin);
      }
    }).catch(function (err) {
        res.status(401).send('Não autorizado!');
    });
  }

  api.verificarToken = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if(token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
          if(err) {
            console.log('Token Unauthorized');
            res.status(401);
          }
          req.admin = decoded;
          next();
      });
    } else {
      res.status(401).send('Não Autorizado');
    }
  }

  return api;
};