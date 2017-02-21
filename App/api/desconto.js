const db = require('../../config/db.js');
const _ = require('underscore');
let api = {};

api.genDesconto = (req, res) => {
  let body = _.pick(req.body, 'valor', 'valorTotal', 'avaliacao');
  db.produto.create(body).then(produto => {
      req.user.addProduto(produto).then(()=> {
        return produto.reload();
      }).then(produto => {
        res.status(200).send('Registro criado');
      });
  }).catch(err => {
    res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  });
  io.emit('attdesc', body.valorTotal - body.valor);
  io.emit('attgraph');
}

module.exports = api;
