const _ = require('underscore');
const db = require('./../../db.js');

module.exports = function(app){

  var api = {};
  api.getByStatus = function(req, res) {
    var status = parseInt(req.params.id, 10);
    db.evento.findAll({
      where: {
        status: status
      },
      include: [db.estabelecimento]
    }).then(function(eventos) {
      if(!!eventos) return res.status(200).json(eventos);
      res.json('Nenhum evento econtrado');
    }, function(err) {
      res.status(500).send(err);
    })
  }

  api.getById = function(req, res){

    var id = parseInt(req.params.id, 10);

    db.evento.findOne({
      where: {
        id:id
      },
      include: [db.estabelecimento]
    }).then(function(evento){
      if(!evento) return res.status(404).send('Nenhum evento encontrado');
      res.json(evento);
    }, function(err) {
      res.status(500).send(err);
    })
  }


  api.list = function(req, res) {
    db.evento.findAll({
      include: [db.estabelecimento]
    }).then(function (evento) {
      if(!!evento) return res.status(200).json(evento);
        res.status(404).send('Not found!');
    }, function (err) {
      res.status(500).send(e);
    })
  }


  api.create = function(req, res) {
    var body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'estabelecimentoId');
    console.log(body);
     db.evento.create(body).then(function(evento) {
         res.json(evento);
     }, function(e) {
         res.status(400).json(e);
     });
  }

  api.update = function(req, res) {
    var id = parseInt(req.params.id, 10);
    var body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'estabelecimentoId');
    var where = {};

    if(body.hasOwnProperty('titulo'))  where.titulo = body.titulo;
    if(body.hasOwnProperty('desc'))  where.desc = body.desc;
    if(body.hasOwnProperty('dataInicio'))  where.dataInicio = body.dataInicio;
    if(body.hasOwnProperty('dataFim')) where.dataFim = body.dataFim;
    if(body.hasOwnProperty('status')) where.status = body.status;
    if(body.hasOwnProperty('estabelecimentoId')) where.estabelecimentoId = body.estabelecimentoId;

    db.evento.findOne({
      where: {
        id: id
      }
    }).then(function (evento) {
      if(evento)
        evento.update(where).then(function (evento) {
            res.status(200).json(evento);
        }).catch(function (err) {
            res.status(400).send(err);
        });
      else
        res.status(404).send();

    }).catch(function (err) {
        res.status(500).send(err);
    });
  }



  return api;
}
