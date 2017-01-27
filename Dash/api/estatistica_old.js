const db = require('./../../db.js');
const _ = require('underscore');
let toMonth = require('../helpers/toMonth.js');
let toMoney = require('../helpers/toMoney.js');

let api = {};

module.exports = function(app) {

  api.getComprasMes = function (req, res) {
    db.produto.findAll().then(function (compras) {
      if(!!compras) {
        let money = toMoney(compras,"desconto");
        let compras = toMoney(compras,"valorTotal");
        return res.status(200).json({total: compras, desconto: money});
      }
      res.status(404).send('Nenhum registro de compra encontrado!');
    }, function (err) {
      res.status(500).send(err);
    });
  }

  api.getUsersMes = (req, res) => {
    db.cliente.findAndCountAll()
    .then(cliente => {
      let clienteMes = toMonth(cliente.rows);
      let clienteTotal = cliente.count;
      return res.status(200).json({clienteMes: clienteMes, clienteTotal: clienteTotal});
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }

  api.getEstabelecimentoMes = (req, res) => {
    db.estabelecimento.findAndCountAll()
    .then(estabelecimento => {
      let estabMes = toMonth(estabelecimento.rows);
      let estabTotal = estabelecimento.count;
      return res.status(200).json({estabMes: estabMes, estabTotal: estabTotal});
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }

  return api;
}
