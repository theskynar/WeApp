const db = require('./../../db.js');
const _ = require('underscore');
let api = {};


api.getIndex = function(req, res) {
  res.render('index');
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
