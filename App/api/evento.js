let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {
  api.getByStatus = (req, res) => {
    db.evento.findAll({
      where: {
        status: 1
      },
      include: [{model: db.estabelecimento, attributes: ['id', 'url', 'nomeEmpresa', 'descontoAplicado', 'img', 'localizacao']}],
  }).then((eventos) => {
      if(!!eventos) return res.status(200).json(eventos);
      res.status(404).json('Nenhum evento encontrado');
    }).catch((err) => {
      res.status(500).send(err);
    });
  }


  return api;
}
