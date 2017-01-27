let api = {};
module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.getByStatus = (req, res) => {
    let status = parseInt(req.params.id, 10);
    db.evento.findAll({
      where: {
        status: status
      },
      include: [db.estabelecimento]
    }).then(eventos => {
      if(!!eventos) return res.status(200).json(eventos);
      return res.status(200).json('Nenhum evento encontrado');
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }

  api.getById = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.evento.findOne({
      where: {
        id:id
      },
      include: [db.estabelecimento]
    }).then(evento => {
      if(!!evento) return res.status(200).json(evento);
      res.status(404).send('Nenhum evento encontrado')
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }


  api.list = (req, res) => {
    db.evento.findAll({
      include: [db.estabelecimento]
    }).then(evento => {
      if(!!evento) return res.status(200).json(evento);
        res.status(404).send('Nenhum evento encontrado.');
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }


  api.create = (req, res) => {
    let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'estabelecimentoId');
     db.evento.create(body).then((evento) => {
         return res.status(201).json(evento);
     }).catch(err => {
         res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
     });
  }

  api.update = (req, res) => {
    let id = parseInt(req.params.id, 10);
    let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'estabelecimentoId');
    db.evento.findById(id).then(evento => {
      if(!!evento) {
        return evento.update(where).then(evento => {
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

  return api;
}
