const db = require('./../../db.js');
const _ = require('underscore');
var toMonth = require('../helpers/toMonth.js');
var toMoney = require('../helpers/toMoney.js');

var api = {};

module.exports = function(app) {

  api.getComprasMes = function (req, res) {
    db.produto.findAll().then(function (compras) {
      if(!!compras) {
        var money = toMoney(compras,"desconto");
        var compras = toMoney(compras,"valorTotal");
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
      var clienteMes = toMonth(cliente.rows);
      var clienteTotal = cliente.count;
      return res.status(200).json({clienteMes: clienteMes, clienteTotal: clienteTotal});
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }

  api.getEstabelecimentoMes = (req, res) => {
    db.estabelecimento.findAndCountAll()
    .then(estabelecimento => {
      var estabMes = toMonth(estabelecimento.rows);
      var estabTotal = estabelecimento.count;
      return res.status(200).json({estabMes: estabMes, estabTotal: estabTotal});
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }

  return api;
}
