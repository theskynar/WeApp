const db = require('./../../db.js');
const _ = require('underscore');
var randomize = require('../helpers/randomize.js');

var api = {};

module.exports = function(app) {
  api.randomPrize = (req, res) => {
    db.produto.findAndCountAll()
    .then(compras => {
      var randomCliente = randomize.sorteio2(compras.rows);
      return res.status(200).json({randomCliente:randomCliente});
    }).catch(err => {
      res.status(500).send(err);
    })
  }

/*  api.getPremiados = (req, res) => {
    db.premio.findAll({
      include:[model: db.produto, attributes: [include: [db.clienteId]]]
    })
  }*/


  return api;
}
