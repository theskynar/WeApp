let api = {};
module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.getByStatus = (req, res) => {
    let status = parseInt(req.params.id, 10);
    db.evento.findAll({
      where: {
        status: status
      },
      include: [db.estabelecimento]
    }).then((eventos) => {
      if(!!eventos) return res.status(200).json(eventos);
      res.json('Nenhum evento econtrado');
    }).catch((err) => {
      res.status(500).send(err);
    })
  }

  api.getById = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.evento.findOne({
      where: {
        id:id
      },
      include: [db.estabelecimento]
    }).then((evento) => {
      if(!!evento) return res.status(200).json(evento);
      res.status(404).send('Nenhum evento encontrado')
    }).catch((err) => {
      res.status(500).send(err);
    })
  }


  api.list = (req, res) => {
    db.evento.findAll({
      include: [db.estabelecimento]
    }).then((evento) => {
      if(!!evento) return res.status(200).json(evento);
        res.status(404).send('Not found!');
    }).catch((err) => {
      res.status(500).send(err);
    })
  }


  api.create = (req, res) => {
    let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'estabelecimentoId');
     db.evento.create(body).then((evento) => {
         res.json(evento);
     }).catch((err) => {
         res.status(400).json(err);
     });
  }

  api.update = (req, res) => {
    let id = parseInt(req.params.id, 10);
    let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'estabelecimentoId');
    let where = {};

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
    }).then((evento) => {
      if(!!evento)
        evento.update(where).then((evento) => {
            return res.status(200).json(evento);
        }).catch((err) => {
            res.status(400).send(err);
        });
      else
        res.status(404).send();

    }).catch((err) => {
        res.status(500).send(err);
    });
  }

  return api;
}
