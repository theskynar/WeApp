const db = require('./../../db.js');
const _ = require('underscore');
var api = {};


api.getIndex = function(req, res) {
  res.render('index');
  var origin = req.get('Origin');
  console.log(origin);
}

api.getTable = function(req, res) {
  res.render('table');
}

api.getComerciante = function(req, res) {
  res.render('saler');
}

api.getConsumidor = function(req, res) {
  res.render('buyer');
}

module.exports = api;
