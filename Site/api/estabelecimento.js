let api = {};
module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.list = (req, res) => {
    db.estabelecimento.findAll({
      attributes: {exclude: ['CNPJ', 'nomeProprietario', 'token', 'tokenHash', 'CEP', 'dataEntrada', 'vencPlano', 'descontoAplicado', 'createdAt', 'updatedAt', 'Tel', 'email', 'premiosSorteados', 'capitalRodado']}
    })
    .then(estabelecimento => res.json(estabelecimento))
    .catch(err => {
      res.status(500).send(err);
    });
  }

  return api;
}
