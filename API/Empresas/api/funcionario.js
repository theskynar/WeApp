const db = require('../../../config/db.js');
const _ = require('underscore');
let api = {};

api.create = (req, res) => {
  let body = _.pick(req.body,  'nome', 'email', 'cargo', 'departamento', 'CPF');
   db.funcionario.create(body).then(funcionario => {
     req.empresa.addFuncionario(funcionario => {
       return funcionario.reload();
     }).then(funcionario => {
       return res.status(200).json(funcionario.toPublicJSON());
     }).catch(err => {
        res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
     })
   }).catch(err => {
       res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
   });
}

/*api.bulkCreate= (req, res) => {
  let body = _.pick(req.body,  'nome', 'email', 'cargo', 'departamento', 'CPF');
   db.funcionario.bulkCreate(body).then(funcionario => {
     req.empresa.addFuncionario(funcionario => {
       return funcionario.reload();
     }).then(funcionario => {
       return res.status(200).json(funcionario.toPublicJSON());
     }).catch(err => {
        res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
     })
   }).catch(err => {
       res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
   });
}*/

api.update = (req, res) => {
  let id = parseInt(req.params.id, 10);
  let body = _.pick(req.body, 'nome', 'email', 'cargo', 'departamento', 'CPF');
  db.funcionario.findOne({
    where: {
      $and: [{id: id}, {empresaId: req.empresa.id}]
    }
  }).then(funcionario => {
    if(!!funcionario) {
      return funcionario.update(body).then(funcionario => {
          res.status(200).json(funcionario.toPublicJSON());
      }).catch((err) => {
          res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      });
    } else {
      res.status(404).send("Funcionário não encontrado.");
    }
  }).catch((err) => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
}


api.list = (req, res) => {
  db.funcionario.findAll({ where : { empresaId : req.empresa.id }}).then(funcionarios => {
    if(!!funcionarios) return res.status(200).json(funcionarios);
      res.status(404).send('Nenhum funcionário encontrado.');
  }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
}

api.listById = (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.funcionario.findOne({
    where: {
      $and: [{id: id}, {empresaId: req.empresa.id}]
    }
  }).then(funcionario => {
      if(!!funcionario) return res.status(200).json(funcionario);
      res.status(404).send('Nenhum funcionário encontrado.')
  }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  })
}

api.delete = (req, res) => {
  let id = parseInt(req.params.id, 10);
  db.funcionario.findOne({
    where: {
      $and: [{id: id}, {empresaId: req.empresa.id}]
    }
  }).then(funcionario => {
    if(!!funcionario) {
      return funcionario.destroy(funcionario).then(funcionarioDeletado => {
         return res.status(204).send();
      }).catch(err => {
        res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      });
    }
    res.status(404).send('Funcionario não encontrado');
  }).catch(err => {
    res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
}

module.exports = api;
