const db = require('../../config/db.js');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const async = require('async');
let api = {};

api.autentica = (req, res) => {
  let body = _.pick(req.body, 'email', 'password');
  async.parallel([
    function(callback) {
      db.empresa.verificar(body).then(empresa => {
        callback(null, empresa);
      }).catch(err => {
        callback(err);
      })
    },
    function(callback) {
      db.estabelecimento.verificar(body).then(estab => {
          callback(null, estab);
        }).catch(err => {
          callback(err);
        })
      }
    ],
    function(err, results) {
      console.log(err);
      if(!!results[0] &&  !_.isEmpty(results[0]) && _.isEmpty(results[1]) && results[0] !== undefined) {
        try {
          let token = jwt.sign({id: results[0].id, tipo: 'empresa'}, 'segredo', {expiresIn: 60*40});
          res.set('x-access-token', token);
          return res.status(200).json(results[0]);
        } catch(e) {
          return res.status(400).send({Erro: e.toString()});
        }
      } else if (!!results[1] &&  !_.isEmpty(results[1]) && _.isEmpty(results[0]) && results[1] !== undefined) {
        try {
          let token = jwt.sign({id: results[1].id, tipo: 'estabelecimento'}, 'segredo', {expiresIn: 60*40});
          res.set('x-access-token', token);
          return res.status(200).json(results[1]);
        } catch(e) {
          return res.status(400).send({Erro: e.toString()});
        }
      } else {
        err = err || 'Dados incorretos';
        return res.status(401).send({Erro: err, Auth: "Não autorizado"});
      }
    });
}

api.verificarToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if(!!token) {
    jwt.verify(token, 'segredo', function(err, decoded) {
        if(err) {
          res.status(401).send({Erro: err, Auth:"Não Autorizado"});
        }
        req.user = decoded;
        next();
    });
  } else {
    res.status(401).send('Não Autorizado');
  }
}

api.verificarTokenEstab = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if(!!token) {
    jwt.verify(token, 'segredo', function(err, decoded) {
        if(err) {
          res.status(401).send({Erro: err, Auth:"Não Autorizado"});
        }
        if(decoded.tipo === 'estabelecimento') {
          req.user = decoded;
          next()
        } else {
          return res.status(401).send("Você não é autorizado a visualizar esse conteúdo.");
        }
    });
  } else {
    res.status(401).send('Não Autorizado');
  }
}

api.verificarTokenEmpresa = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if(!!token) {
    jwt.verify(token, 'segredo', function(err, decoded) {
        if(err) {
          res.status(401).send({Erro: err, Auth:"Não Autorizado"});
        }
        if(decoded.tipo === 'empresa') {
          req.user = decoded;
          next()
        } else {
          return res.status(401).send("Você não é autorizado a visualizar esse conteúdo.");
        }
    });
  } else {
    res.status(401).send('Não Autorizado');
  }
}

module.exports = api;
