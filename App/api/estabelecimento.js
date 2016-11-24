var api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.list = (req, res) => {
    db.estabelecimento.findAll({
      where: {
        vencPlano: { $gte: Date.now() }
      },
      attributes: {
        exclude: ['CNPJ', 'nomeProprietario', 'dataEntrada', 'vencPlano', 'premiosSorteados', 'capitalRodado']
      }
    }).then((estabelecimento) => {
      if(!!estabelecimento) return res.status(200).json(estabelecimento);
      res.status(404).send('Not found!');
    }).catch((err) => {
      res.status(500).send(e);
    });
  }

  return api;
}
