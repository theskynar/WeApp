const db = require('./../../db.js');
const _ = require('underscore');

var api = {};

module.exports = function(app) {

  api.getComprasMes = function (req, res) {
    db.produto.findAll().then(function (compras) {
      if(!!compras) {
        var meses = new Array(12).map((item) => '0');
        compras.forEach((item, key) => {
        	var month = item.createdAt.getMonth();
          console.log(month);
          if(meses[month] === undefined) meses[month] = '0';
          meses[month] = parseInt(meses[month]) + 1;
        });
        console.log(meses);
        return res.status(200).json(meses);
      }
      res.status(404).send('Nenhum registro de compra encontrado!');
    }, function (err) {
      res.status(500).send(err);
    });
  }

  /*api.getCompras = function(req, res) {
    db.produto.findAll({
      //attributes :[ [db.sequelize.fn('SUM', db.sequelize.col('desconto')), 'totalDesconto'], 'id', 'valor', 'valorTotal', 'desconto', 'avaliacao'],
      include:[{model: db.cliente},
      {model:db.estabelecimento, attributes: ['id', 'url', 'email', 'cidade', 'dataEntrada', 'vencPlano','nomeEmpresa', 'descontoAplicado', 'img', 'localizacao', 'Tel', 'nomeProprietario']}]
    }).then(function(compras) {
      if(!!compras) return res.status(200).json(compras);
      res.status(404).send('Nenhum registro encontrado');
    }).catch( function(err) {
        console.log(err);
        res.status(500).send(err);
    })
  }*/

  api.getComprasByEstabelecimentoId = function(req, res) {
    var id = parseInt(req.params.id, 10);
    db.produto.findAll({
      where: {
        estabelecimentoId: id
      },
      include:[{model: db.cliente},
      {model:db.estabelecimento, attributes: ['id', 'url', 'email', 'cidade', 'dataEntrada', 'vencPlano','nomeEmpresa', 'descontoAplicado', 'img', 'localizacao', 'Tel', 'nomeProprietario']}]
    }).then(function(compras) {
      if(!!compras) return res.status(200).json(compras);
      res.status(404).send('Nenhum registro encontrado');
    }).catch( function(err) {
        console.log(err);
        res.status(500).send(err);
    });
  }

  return api;
}
