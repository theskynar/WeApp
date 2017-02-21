let api = {};
const _ = require('underscore');
const db = require('../../config/db.js');
const mysql = require('mysql');

let select = "SELECT eventos.id, eventos.titulo, eventos.desc, eventos.dataInicio, eventos.dataFim, eventos.status FROM eventos WHERE estabelecimentoId = ?";
let selectById = "SELECT eventos.id, eventos.titulo, eventos.desc, eventos.dataInicio, eventos.dataFim, eventos.status FROM eventos WHERE id = ? AND estebelecimentoId = ?";
let insert = "INSERT INTO  eventos SET ?";
let update = "UPDATE eventos SET titulo = ?, desc = ?, dataInicio = ?, dataFim = ?, status = ?, updatedAt = ?  WHERE id = ? AND estebelecimentoId = ?";
let remove = "DELETE FROM eventos WHERE id = ? AND estebelecimentoId = ?";
let selectById = "SELECT eventos.id, eventos.titulo, eventos.desc, eventos.dataInicio, eventos.dataFim, eventos.status FROM eventos WHERE status = ? AND estebelecimentoId = ?";

api.create = (req, res) => {
  let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'estabelecimentoId');
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
        if(error) return res.status(400).send({Erro: error.toString()});
        return res.status(200).send({id: result.insertId, success: "Evento criado!"});
    });
  });
};

api.list = (req, res) => {
  let attr = [req.user.id];
  let query = mysql.format(select, attr);
  db.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.status(500).send({status: "Erro ao estabelecer conexão com o banco.", erro: err});
    }
    con.query(query, function (error, result) {
        con.release();
        if (error) return res.status(400).send({Erro: error});
        if(!_.isEmpty(result)) return res.status(200).json({eventos: result, success: 'Dados recebidos');
        return res.status(404).send("Nenhum funcionário encontrado!");
    });
  });
}

api.update = (req, res) => {
  let id = parseInt(req.params.id, 10);
  let body = _.pick(req.body, 'titulo', 'desc', 'dataInicio', 'dataFim', 'status', 'updatedAt');
  if(new Date(body.dataInicio) > new Date(body.dataFim)) return res.status(400).send("Inserir datas válidas");
  body.updatedAt = new Date();
  let attr_two = [id, req.user.id];
  let query_two = mysql.format(selectById, attr_two);
  db.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.status(500).send({status: "Erro ao estabelecer conexão com o banco.", erro: err});
    }
    con.query(query_two, function (error, result) {
        if (error) return res.status(400).send({Erro: error.toString()});
        if(!_.isEmpty(result)) {
          let attr = [body.titulo, body.desc, body.dataInicio, body.dataFim, body.status, result[0].id, result[0].estabelecimentoId];
          let query = mysql.format(update, attr);
          con.query(query, function(error, result) {
              con.release();
              if (error) return res.status(400).send({Erro: error});
              return res.status(200).json({success: 'Atualizado com sucesso', evento: result});
          });
        } else {
          return res.status(404).send("Nenhum evento encontrado.");
        }
    });
  });
}

api.destroy = (req, res) => {
  let id = parseInt(req.params.id, 10);
  let attr_two = [id, req.user.id];
  let query_two = mysql.format(selectById, attr_two);
  db.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.status(500).send({status: "Erro ao estabelecer conexão com o banco.", erro: err});
    }
    con.query(query_two, function (error, result) {
        if (error) return res.status(400).send({Erro: error});
        if(!_.isEmpty(result)) {
          let attr = [result[0].id, result[0].estabelecimentoId];
          let query = mysql.format(remove, attr);
          con.query(query, function(error, result) {
              con.release();
              if (error) return res.status(400).send({Erro: error});
              return res.status(200).json({success: 'Deletado com sucesso'});
          });
        } else {
          return res.status(404).send("Nenhum evento encontrado.");
        }
    });
  });
}

api.listById = (req, res) => {
  let id = parseInt(req.params.id, 10);
  let attr = [id, req.user.id];
  let query = mysql.format(selectById, attr);
  db.getConnection(function(err, con) {
    if (err) {
      con.release();
      res.status(500).send({status: "Erro ao estabelecer conexão com o banco.", erro: err});
    }
    con.query(query, function (error, result) {
        con.release();
        if (error) return res.status(400).send({Erro: error});
        if(!_.isEmpty(result)) return res.status(200).json({evento: result[0], success:"Evento recebido"});
        return res.status(404).send("Nenhum evento encontrado.");

    });
  });
}


  api.listByStatus = (req, res) => {
    let status = parseInt(req.params.id, 10);
    let attr = [id, req.user.id];
    let query = mysql.format(selectByStatus, attr);
    db.getConnection(function(err, con) {
      if (err) {
        con.release();
        res.status(500).send({status: "Erro ao estabelecer conexão com o banco.", erro: err});
      }
      con.query(query, function (error, result) {
          con.release();
          if (error) return res.status(400).send({Erro: error});
          if(!_.isEmpty(result)) return res.status(200).json({evento: result[0], success:"Evento recebido"});
          return res.status(404).send("Nenhum evento encontrado.");

      });
    });
  }

module.exports = api;
