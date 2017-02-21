const db = require('../../config/db.js');
const _ = require('underscore');
let toMonth = require('../../Util/toMonth.js');
let toMoney = require('../../Util/toMoney.js');
const mysql = require('mysql');

let select = "SELECT estatisticas.* FROM eventos WHERE estabelecimentoId = ?";
let selectByClient = "SELECT cliente.id, cliente.createdAt count(1) FROM cliente";

let api = {


  "getCompras": (q, userId) => {
    return new Promise( (resolve, reject) => {
      let attr = userId;
      let query = mysql.format(select, attr);
      db.getConnection(function(err, con) {
        if (err) {
          con.release();
          reject(err);
        }
        con.query(query, function (error, result) {
            con.release();
            if (error) reject(error);
            if(!_.isEmpty(result))  {
              let money = toMoney(result,"desconto");
              let compras = toMoney(result,"valorTotal");
                      resolve({desconto: money, total: compras});
            }
            else reject("Nenhuma compra feita ems eu estabelecimento");
        });
      });
    });
  },

  "getUsers": () => {
    return new Promise ( (resolve, reject) => {
      let attr = userId;
      let query = mysql.format(select, attr);
      db.getConnection(function(err, con) {
        if (err) {
          con.release();
          reject(err);
        }
        con.query(query, function (error, result) {
            con.release();
            if (error) reject(error);
            if(!_.isEmpty(result))  {
              let clienteMes = toMonth(result);
              let clienteTotal = result;
              return resolve({mes: clienteMes, total: clienteTotal});
            }
            else reject("Nenhuma compra feita ems eu estabelecimento");
        });
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
