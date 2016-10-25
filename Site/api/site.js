const db = require('./../../db.js');
const _ = require('underscore');
var api = {};


api.getIndex = function(req, res) {
  res.render('index.html');
}

api.getTable = function(req, res) {
  res.render('table.html');
}

api.getComerciante = function(req, res) {
  res.render('saler.html');
}

api.getConsumidor = function(req, res) {
  res.render('buyer.html');
}

module.exports = api;
