let api = {};
const db = require('../../db.js');
const _ = require('underscore');

api.create = (req, res) => {
  let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status');
   db.evento.create(body).then(evento => {
     req.user.addEvento(evento).then(()=> {
       return evento.reload();
     }).then(evento => {
       return res.status(201).send('Evento criado com sucesso.');
     });
   }).catch(err => {
       res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
   });
};

api.list = (req, res) => {
  db.evento.findAll({
    where: {
      estabelecimentoId: req.user.id
    }
  }).then(eventos => {
    if(!!eventos) return res.status(200).json(eventos);
      res.status(404).send('Nenhum evento encontrado.');
  }).catch(err => {
    res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  })
}

api.update = (req, res) => {
  let id = parseInt(req.params.id, 10);
  let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status');
  db.evento.findOne({
    where: {
      $and: [ {id : id}, {estabelecimentoId: req.user.id} ]
    }
  }).then(evento => {
    if(!!evento) {
      return evento.update(body).then(evento => {
          return res.status(200).json(evento);
      }).catch((err) => {
          res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      });
    } else {
      res.status(404).send("Nenhum evento encontrado");
    }
  }).catch((err) => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
}

api.destroy = (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.evento.findOne({
    where: {
      $and: [ {id : id}, {estabelecimentoId: req.user.id} ]
    }
  }).then(evento => {
    if(!!evento) {
      return evento.destroy(evento).then(evento => {
          return res.status(204).json();
      }).catch((err) => {
          res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      });
    } else {
      res.status(404).send("Nenhum evento encontrado");
    }
  }).catch((err) => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
}

api.listById = (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.evento.findOne({
    where: {
      $and: [ {id : id}, {estabelecimentoId: req.user.id} ]
    },
  }).then(evento => {
    if(!!evento) return res.status(200).json(evento);
    res.status(404).send('Nenhum evento encontrado')
  }).catch(err => {
    res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  })
}


  api.listByStatus = (req, res) => {
    let status = parseInt(req.params.id, 10);
    db.evento.findAll({
      where: {
        $and: [ {status : status}, {estabelecimentoId: req.user.id} ]
      },
    }).then(eventos => {
      if(!!eventos) return res.status(200).json(eventos);
      return res.status(200).json('Nenhum evento encontrado');
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }

module.exports = api;
