const _ = require('underscore');
const db = require('./../../db.js');
  var api = {};
  // RESTANDO APENAS GET COMPRAS;

  api.getAllEstabelecimentos = function(req, res) {
    db.estabelecimento.findAll().then(function (estabelecimento) {
      if(!!estabelecimento) {
        res.status(200).json(estabelecimento);
      } else {
        res.status(404).send('Not found!');
      }
    }, function (err) {
      res.status(500).send(e);
    })
  }

  api.autenticaUser = function(req, res) {
    var body = _.pick(req.body, 'email');
  	db.cliente.verificar(body).then(function (cliente) {
      if(cliente) {
        res.status(200).send('Usuário existente!');
      }
  	}).catch(function (err) {
        res.status(401).send(err);
  	});
  }

  api.cadastraUser = function(req, res) {
    var body = _.pick(req.body, 'email', 'nome', 'bairroMora', 'bairroTrabalha', 'cel', 'dob');
    db.cliente.create(body).then(function(cliente) {
      if(cliente) {
        res.status(200).json(cliente.toPublicJSON());
      }
    }).catch(function(err){
        res.status(400).send('Não foi possível criar o usuário: ' + err);
    });
  }

  api.atualizaUser = function(req, res) {
    var id = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'email', 'nome', 'bairroMora', 'bairroTrabalha', 'cel', 'dob');
    var where = {};

    if(body.hasOwnProperty('email')) { where.email = body.email; }
    if(body.hasOwnProperty('nome')) { where.nome = body.nome; }
    if(body.hasOwnProperty('bairroMora')) { where.bairroMora = body.bairroMora; }
    if(body.hasOwnProperty('bairroTrabalha')) { where.bairroTrabalha = body.bairroTrabalha; }
    if(body.hasOwnProperty('cel')) { where.cel = body.cel; }
    if(body.hasOwnProperty('dob')) { where.dob = body.dob; }

    db.cliente.findOne({
      where: {
        id: id
      }
    }).then(function (cliente) {
      if(cliente) {
        cliente.update(where).then(function (cliente) {
            res.status(200).json(cliente.toPublicJSON());
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

module.exports = api;
