const _ = require('underscore');
const db = require('./../../db.js');
var api = {};
module.exports = function(app){
  api.getByStatus = function(req, res) {
    var status = parseInt(req.params.id, 10);
    db.evento.findAll({
      where: {
        status: status
      }
    }).then(function(eventos) {
      if(!!eventos) return res.status(200).json(eventos);
      res.json('Nenhum evento econtrado');
    }, function(err) {
      res.status(500).send(err);
    })
  }


  return api;
}
