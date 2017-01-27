const db = require('./../../db.js');
const _ = require('underscore');
let toMonth = require('../helpers/toMonth.js');
let toMoney = require('../helpers/toMoney.js');

let api = {

  "getCompras": (q, userId) => {
    return new Promise( (resolve, reject) => {
      db.produto.findAll({
        where: {
          estabelecimentoId: userId
        }
      }).then(comprasDb => {
        let money = toMoney(comprasDb,"desconto");
        let compras = toMoney(comprasDb,"valorTotal");
        resolve({desconto: money, total: compras});
      }).catch(err => {
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

  "getQtdComprasUsuario": (q, userId) => {
    if(!q.hasOwnProperty('limite') || typeof q.limite !== 'number') {
      q.limite = 5;
    }
    let query = `select cliente.*, count(produto.clienteId) as n_compras from
                    cliente left join produto
                    on (cliente.id = produto.clienteId)
                    and (produto.estabelecimentoId = ${userId})
                    group by cliente.id
                    order by n_compras desc limit ${q.limite}`;
    return new Promise( (resolve, reject) => {
      db.sequelize.query(query, null).then(comprasDb => {
        let arr = _.omit(comprasDb, '1');
        resolve(arr[0]);
      }).catch(err => {
        reject(err);
      });
    });
  },

}


module.exports = api;
