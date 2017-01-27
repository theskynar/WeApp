const db = require('../../config/db.js');
const _ = require('underscore');
let toMonth = require('../../Util/toMonth.js');
let toMoney = require('../../Util/toMoney.js');
function cmp(a,b) {
  if(a.n_compras < b.n_compras) return -1;
  if(a.n_compras > b.n_compras) return 1;
  return 0;
}

let api = {

  "getCompras": () => {
    return new Promise( (resolve, reject) => {
      db.produto.findAll()
      .then(comprasDb => {
        let money = toMoney(comprasDb,"desconto");
        let compras = toMoney(comprasDb,"valorTotal");
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

  "getQtdComprasUsuario": (q, userId) => {
    if(!q.hasOwnProperty('limite')) {
      q.limite = 5;
    }
    let query = `select cliente.*, count(produto.clienteId) as n_compras from
                    cliente left join produto
                    on (cliente.id = produto.clienteId)
                    and (produto.estabelecimentoId = ${userId})
                    group by cliente.id
                    order by n_compras desc limit ${q.limite}`;
    return new Promise( (resolve, reject) => {
      db.sequelize.query(query).then(comprasDb => {
        resolve({result: comprasDb});
      }).catch(err => {
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
