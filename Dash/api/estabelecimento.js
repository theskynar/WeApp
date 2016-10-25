const _ = require('underscore');
const db = require('./../../db.js');

module.exports = function(app){

  var api = {};

  api.getById = function(req, res){

    var id = parseInt(req.params.id, 10);

    db.estabelecimento.findOne({
      where: {
        id:id
      }
    }).then(function(estabelecimento){

      if(!estabelecimento) return res.status(404).send('Não encontrado nenhum estabelecimento.');
      res.json(estabelecimento);

    }, function(err) {
      res.status(500).send(err);
    })


  }


  api.list = function(req, res) {
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


  api.create = function(req, res) {
    var body = _.pick(req.body, 'CNPJ', 'Tel', 'email', 'nomeEmpresa', 'nomeProprietario', 'segmento', 'cidade', 'bairro', 'CEP',
      'descontoAplicado', 'url', 'urlFace', 'dataEntrada', 'vencPlano', 'descontoAplicado');
     db.estabelecimento.create(body).then(function(estabelecimento) {
         res.json(estabelecimento);
     }, function(e) {
         res.status(400).json(e);
     });
  }

  api.update = function(req, res) {
    var id = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'CNPJ', 'Tel', 'email', 'nomeEmpresa', 'nomeProprietario', 'segmento', 'cidade', 'bairro', 'CEP',
      'descontoAplicado', 'url', 'urlFace', 'dataEntrada', 'vencPlano');
    var where = {};

    if(body.hasOwnProperty('CNPJ')) { where.CNPJ = body.CNPJ; }
    if(body.hasOwnProperty('Tel')) { where.Tel = body.Tel; }
    if(body.hasOwnProperty('email')) { where.email = body.email; }
    if(body.hasOwnProperty('nomeEmpresa')) { where.nomeEmpresa = body.nomeEmpresa; }
    if(body.hasOwnProperty('nomeProprietario')) { where.nomeProprietario = body.nomeProprietario; }
    if(body.hasOwnProperty('segmento')) { where.segmento = body.segmento; }
    if(body.hasOwnProperty('cidade')) { where.cidade = body.cidade; }
    if(body.hasOwnProperty('bairro')) { where.bairro = body.bairro; }
    if(body.hasOwnProperty('CEP')) { where.CEP = body.CEP; }
    if(body.hasOwnProperty('descontoAplicado')) { where.descontoAplicado = body.descontoAplicado; }
    if(body.hasOwnProperty('url')) { where.url = body.url; }
    if(body.hasOwnProperty('urlFace')) { where.urlFace = body.urlFace; }
    if(body.hasOwnProperty('dataEntrada')) { where.dataEntrada = body.dataEntrada; }
    if(body.hasOwnProperty('vencPlano')) { where.vencPlano = body.vencPlano; }

    db.estabelecimento.findOne({
      where: {
        id: id
      }
    }).then(function (estabelecimento) {
      if(estabelecimento) {
        estabelecimento.update(where).then(function (estabelecimento) {
            res.status(200).json(estabelecimento);
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



  return api;
}
