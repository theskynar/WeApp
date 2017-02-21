const db = require('../../../config/db.js');
const _ = require('underscore');
let api = {};
let insert = "INSERT INTO produto SET ?";

api.genDesconto = (req, res) => {
  let body = _.pick(req.body, 'valor', 'valorTotal', 'estabelecimentoId');
  body.estabelecimentoId = req.user.id;
  let attr = [body];
  let query = mysql.format(insert, attr);
  db.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.status(500).send({status: "Erro ao estabelecer conexão com o banco.", erro: err});
    }
    con.query(query, function (error, result) {
        con.release();
        if (error) return res.status(400).send({Erro: error});
        return res.status(200).send({id: result.insertId, success: "Desconto gerado!"});
    });
  });
  io.emit('attdesc', body.valorTotal - body.valor);
  io.emit('attgraph');
}

module.exports = api;
