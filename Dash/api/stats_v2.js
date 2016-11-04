const db = require('./../../db.js');
const _ = require('underscore');
var toMonth = require('../helpers/toMonth.js');
var toMoney = require('../helpers/toMoney.js');

var api = {

  "getCompras": function(){
    return new Promise( (resolve, reject) => {
      db.produto.findAll()
      .then(compras => {
        var money = toMoney(compras,"desconto");
        var compras = toMoney(compras,"valorTotal");
        resolve({desconto: money, total: compras});
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  },

  "getUsers": () => {
    return new Promise ( (resolve, reject) => {
      db.cliente.findAndCountAll()
      .then(cliente => {
        var clienteMes = toMonth(cliente.rows);
        var clienteTotal = cliente.count;
        return resolve({mes: clienteMes, total: clienteTotal});
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  "getEstabelecimento": () => {
    return new Promise((resolve, reject) => {
      db.estabelecimento.findAndCountAll()
      .then(estabelecimento => {
        var estabMes = toMonth(estabelecimento.rows);
        var estabTotal = estabelecimento.count;
        return resolve({mes: estabMes, total: estabTotal});
      })
      .catch(err => {
        reject(err);
      });
    });
  }

}


module.exports = api;
