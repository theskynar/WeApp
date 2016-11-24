const randomize = require('../helpers/randomize.js');

let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {
  api.randomPrize = (req, res) => {
    db.produto.findAndCountAll()
    .then(compras => {
      let randomCliente = randomize.sorteio2(compras.rows);
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
