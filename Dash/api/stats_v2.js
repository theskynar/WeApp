const db = require('./../../db.js');
const _ = require('underscore');
var toMonth = require('../helpers/toMonth.js');
var toMoney = require('../helpers/toMoney.js');

var api = {};

module.exports = function(app) {

  api.getCompras = () => {
    return new Promise( (resolve, reject) => {
      db.produto.findAll()
      .then(compras => {
          var money = toMoney(compras,"desconto");
          var compras = toMoney(compras,"valorTotal");
          return resolve(compras)
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  api.getUsers = () => {
    return new Promise ( (resolve, reject) => {
      db.cliente.findAndCountAll()
      .then(cliente => {
        var clienteMes = toMonth(cliente.rows);
        var clienteTotal = cliente.count;
        return resolve({clienteMes: clienteMes, clienteTotal: clienteTotal});
      })
      .catch(err => {
        reject(err);
      });
    });
  }


  api.getEstabelecimento = () => {
    return new Promise((resolve, reject) => {
      db.estabelecimento.findAndCountAll()
      .then(estabelecimento => {
        var estabMes = toMonth(estabelecimento.rows);
        var estabTotal = estabelecimento.count;
        return resolve({estabMes: estabMes, estabTotal: estabTotal});
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  return api;
}
