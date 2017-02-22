const db = require('../../config/db.js');
const _ = require('underscore');
let api = {};

api.genDesconto = (req, res) => {
  let body = _.pick(req.body, 'valor', 'valorTotal', 'estabelecimentoId');
  body.estabelecimentoId = req.user.id;
  db.produto.create(body).then(produto => {
    if(!!produto) return res.status(200).send('Registro criado');
  }).catch(err => {
    return res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
  io.emit('attdesc', body.valorTotal - body.valor);
  io.emit('attgraph');
}

module.exports = api;
