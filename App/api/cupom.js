const db = require('../../../config/db.js');
const _ = require('underscore');
let api = {};

api.create = (req, res) => {
  let body = _.pick(req.body, 'nome', 'dataInicio', 'dataFim', 'valor', 'cupom');
    try {
      let cupom = codes.generate({
         length: 6,
         count: 1,
         prefix: body.nome,
         suffix: "*"+req.user.id
       });
    } catch (e) {
      throw new Error(e);
    }
    body.cupom = cupom[0];
   db.cupom.create(body).then(cupom => {
     return req.user.addCupom(response => {
       return cupom.reload();
     }).then(response => {
       return res.status(200).json(response.toPublicJSON());
     }).catch(err => {
        res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
     })
   }).catch(err => {
       res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
   });
}

api.update = (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.cupom.findOne({
    where: {
      $and: [{id: id}, {empresaId: req.user.id}]
    }
  }).then(cupom => {
    if(!!cupom) {
      return cupom.updateAttributes({
        dataFim: req.body.dataFim
      }).then(cupom => {
          res.status(200).json(cupom.toPublicJSON());
      }).catch((err) => {
          res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      });
    } else {
      res.status(404).send("Cupom não encontrado.");
    }
  }).catch((err) => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
}


api.list = (req, res) => {
  db.cupom.findAll({ where : { empresaId : req.user.id }}).then(cupoms => {
    if(!!cupoms) return res.status(200).json(cupoms);
      res.status(404).send('Nenhum cupom encontrado.');
  }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
};

api.listById = (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.cupom.findOne({
    where: {
      $and: [{id: id}, {empresaId: req.user.id}]
    }
  }).then(cupom => {
      if(!!cupom) return res.status(200).json(cupom);
      res.status(404).send('Nenhum cupom encontrado.')
  }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  })
}

api.delete = (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.cupom.findOne({
    where: {
      $and: [{id: id}, {empresaId: req.user.id}]
    }
  }).then(cupom => {
    if(!!cupom) {
      return cupom.destroy(cupom).then(cupomDeletado => {
         return res.status(204).send();
      }).catch(err => {
        res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      });
    }
    res.status(404).send('cupom não encontrado');
  }).catch(err => {
    res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
}

module.exports = api;
