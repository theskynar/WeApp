const randomize = require('../../Util/randomize.js');

let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {
  api.randomPrize = (req, res) => {
    var d = new Date();
    var qtd = req.params.qtd;
    db.produto.findAndCountAll({
      include: [
        { model: db.cliente, attributes: ['nome', 'email', 'cel', 'bairroMora'] },
        { model: db.estabelecimento, attributes: ['nomeEmpresa', 'email', 'Tel', 'segmento', 'url', 'bairro', 'CEP']}
      ]
    })
    .then(compras => {
      body = 5;
      //if(compras.count <= (body*1)) return res.status(400).send('Você não pode gerar um sorteio, pois poucos descontos foram gerados, tenha ao menos 30 gerados.');
      let randomCliente = [];
      randomCliente = randomize.sorteio2(compras.rows, qtd);
      Promise.all(randomCliente);
      var n = d.getMilliseconds();
      return res.status(200).json({randomCliente: randomCliente, n: n});
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }

    api.randomPrize2 = (req, res) => {
      var qtd = req.params.qtd;
      let arr = [];
      db.produto.findAndCountAll({
        include: [
          { model: db.cliente, attributes: ['nome', 'email', 'cel', 'bairroMora'] },
          { model: db.estabelecimento, attributes: ['nomeEmpresa', 'email', 'Tel', 'segmento', 'url', 'bairro', 'CEP']}
        ]
      })
      .then(compras => {
        let result = compras.rows;
        for(var i =0; i < qtd; i++) {
          arr.push(randomize.sorteio(result));
        }
        arr = randomize.removeDuplicates(arr);
        diff = randomize.filterDiff(result, arr);
        while(arr.length < qtd) {
          diff = randomize.filterDiff(diff, arr);
          arr.push(randomize.sorteio(diff));
        }
        Promise.all(arr);
        return res.status(200).json(arr);
      }).catch(err => {
        res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      })
    }

/*  api.getPremiados = (req, res) => {
    db.premio.findAll({
      include:[model: db.produto, attributes: [include: [db.clienteId]]]
    })
  }*/


  return api;
}
