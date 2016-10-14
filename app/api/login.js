const jwt = require('jsonwebtoken');
const _ = require('underscore');
const db = require('./../../db.js');

module.exports = function(app){
  let api = {};

  api.getLogin = function(req, res) {
    res.render('login');
  }

  api.autenticaLogin = function(req, res) {
    var body = _.pick(req.body, 'email', 'password');
    var adminInstance;
    db.admin.verificar(body).then(function (admin) {
      if(!admin) {
        console.log('Não Autorizado!');
      } else {
        var token = jwt.sign(admin.email , app.get('secret'));
        console.log(token);
        res.set('x-access-token', token);
        res.end();
      }
    }).catch(function (err) {
      console.log(err);
        res.status(401).send('Unauthorized');
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
      console.log(token);
      res.status(401).send('Não Autorizado');
    }
  }

  return api;
};
