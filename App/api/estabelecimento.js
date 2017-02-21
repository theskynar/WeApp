let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.list = (req, res) => {
    db.estabelecimento.findAll({
      where: {
        vencPlano: { $gte: Date.now() }
      },
      attributes: {
        exclude: ['CNPJ', 'nomeProprietario', 'dataEntrada', 'vencPlano', 'levelPlano', 'token', 'tokenHash', 'token_teste', 'passwordHashed', 'passwordCrypto', 'salted']
      }
    }).then(estabelecimento => {
      if(!!estabelecimento) return res.status(200).json(estabelecimento);
      res.status(404).send('Estabelecimento não encontrado');
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    });
  }

  return api;
}
