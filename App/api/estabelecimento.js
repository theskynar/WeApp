const _ = require('underscore');
const db = require('./../../db.js');
var api = {};
  // RESTANDO APENAS GET COMPRAS;

module.exports = function(app) {

  api.list = function(req, res) {
    db.estabelecimento.findAll().then(function (estabelecimento) {
      if(!!estabelecimento) {
        res.status(200).json(estabelecimento);
      } else {
        res.status(404).send('Not found!');
      }
    }, function (err) {
      res.status(500).send(e);
    })
  }

  return api;
}
