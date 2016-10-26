const _ = require('underscore');
const db = require('./../../db.js');
var api = {};
module.exports = function(app){
  api.getByStatus = function(req, res) {
    db.evento.findAll({
      where: {
        status: 1
      },
      include: [db.estabelecimento]
    }).then(function(eventos) {
      console.log(JSON.stringify(eventos));
      if(!!eventos) return res.status(200).json(eventos);
      res.json('Nenhum evento encontrado');
    }, function(err) {
      res.status(500).send(err);
    })
  }


  return api;
}
