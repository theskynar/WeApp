const db = require('./../../db.js');
const _ = require('underscore');
var api = {};


api.getIndex = (req, res) => res.render('index');
api.getTable = (req, res) => res.render('table');
api.getComerciante = (req,res) => res.render('saler');
api.getConsumidor = (req, res) => res.render('buyer');

api.getcompras = (req, res) => {
  db.produto.findAll({
     attributes :[ [db.sequelize.fn('SUM', db.sequelize.col('desconto')), 'totalDesconto']],
   })
   .then(compras => res.json(compras[0].dataValues.totalDesconto))
   .catch(err => {
       console.log(err);
       res.status(500).send(err);
   });
}

module.exports = api;
