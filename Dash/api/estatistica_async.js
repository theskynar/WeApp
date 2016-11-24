const db = require('./../../db.js');
const _ = require('underscore');
let toMonth = require('../helpers/toMonth.js');
let toMoney = require('../helpers/toMoney.js');

let api = {

  "getCompras": () => {
    return new Promise( (resolve, reject) => {
      db.produto.findAll()
      .then(compras => {
        let money = toMoney(compras,"desconto");
        let compras = toMoney(compras,"valorTotal");
        resolve({desconto: money, total: compras});
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  "getUsers": () => {
    return new Promise ( (resolve, reject) => {
      db.cliente.findAndCountAll()
      .then(cliente => {
        let clienteMes = toMonth(cliente.rows);
        let clienteTotal = cliente.count;
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
        let estabMes = toMonth(estabelecimento.rows);
        let estabTotal = estabelecimento.count;
        return resolve({mes: estabMes, total: estabTotal});
      })
      .catch(err => {
        reject(err);
      });
    });
  }

}


module.exports = api;
