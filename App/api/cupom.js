const db = require('../../config/db.js');
const _ = require('underscore');
const codes = require('voucher-code-generator');
let api = {};

api.create = (req, res) => {
  let body = _.pick(req.body, 'cupom', 'dataInicio', 'dataFim', 'descricao', 'empresaId', 'clienteId', 'valorEmPorcentagem');
  body.empresaId = req.user.id;
  let ini = new Date(body.dataInicio);
  let fim = new Date(body.dataFim);
  if(body.valor < 5) return res.status(400).send("Insira um valor de desconto acima ou de 5%");
  if(ini.getTime()>fim.getTime()) {
    return res.status(400).send("Insira datas válidas");
  }
  if(ini.getFullYear < new Date().getFullYear() || fim.getFullYear < new Date().getFullYear()) {
    return res.status(400).send("Insira um ano a partir do ano atual");
  }
  let cupom;
    try {
      cupom = codes.generate({
         length: 5,
         count: 1,
         prefix: new Date(body.dataFim).getYear(),
         suffix: body.empresaId
       });
    } catch (e) {
      throw new Error(e);
    }
    body.cupom = cupom[0];
   db.cupom.create(body).then(cupom => {
     if(cupom) return res.status(201).json(cupom);
   }).catch(err => {
       res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
   });
}

api.update = (req, res) => {
  let id = parseInt(req.params.id, 10);
  let body = _.pick(req.body, 'cupom', 'dataInicio', 'dataFim', 'descricao', 'valorEmPorcentagem');
  let ini = new Date(body.dataInicio);
  let fim = new Date(body.dataFim);
  if(body.valor < 5) return res.status(400).send("Insira um valor de desconto acima ou de 5%");
  if(ini.getTime()>fim.getTime()) {
    return res.status(400).send("Insira datas válidas");
  }
  if(ini.getFullYear < new Date().getFullYear() || fim.getFullYear < new Date().getFullYear()) {
    return res.status(400).send("Insira um ano a partir do ano atual");
  }
  db.cupom.findOne({
    where: {
      $and: [{id: id}, {empresaId: req.user.id}]
    }
  }).then(cupom => {
    if(!!cupom) {
      return cupom.updateAttributes({
        dataInicio:body.dataInicio,
        dataFim:body.dataFim,
        descricao:body.descricao,
        valorEmPorcentagem:body.valorEmPorcentagem
      }).then(cupom => {
          res.status(200).json(cupom);
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
  db.cupom.findAll({
     where : {
       empresaId : req.user.id
     },
     include:[
       {model:db.cliente, attributes: ['id', 'nome', 'email', 'bairroMora', 'bairroTrabalha', 'genero', 'cel', 'dob', 'createdAt']}
     ]
   }).then(cupoms => {
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
    },
    include:[
      {model:db.cliente, attributes: ['id', 'nome', 'email', 'bairroMora', 'bairroTrabalha', 'genero', 'cel', 'dob', 'createdAt']}
    ]
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
