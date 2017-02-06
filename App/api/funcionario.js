const db = require('../../config/db.js');
const _ = require('underscore');
let mysql = require('mysql');

let api = {};
let sql;
let select = "SELECT funcionario.id, funcionario.nome, funcionario.CPF, funcionario.departamento, funcionario.email, funcionario.cargo FROM funcionario WHERE empresaId = ?";
let selectById = "SELECT funcionario.id, funcionario.nome, funcionario.CPF, funcionario.departamento, funcionario.email, funcionario.cargo FROM funcionario WHERE id = ? AND empresaId = ?";
let insert = "INSERT INTO  funcionario SET ?";
let update = "UPDATE funcionario SET nome = ?, email = ?, cargo = ?, departamento = ?, CPF = ?, updatedAt = ?  WHERE id = ? AND empresaId = ?";
let remove = "DELETE FROM funcionario WHERE id = ? AND empresaId = ?";


api.create = (req, res) => {
  let body = _.pick(req.body,  'nome', 'email', 'cargo', 'departamento', 'CPF', 'empresaId', 'createdAt', 'updatedAt');
  body.empresaId = req.user.id;
  body.createdAt = new Date();
  body.updatedAt = body.createdAt;
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
        return res.status(200).send({id: result.insertId});
    });
  });
}

/*api.bulkCreate= (req, res) => {
  let body = _.pick(req.body,  'nome', 'email', 'cargo', 'departamento', 'CPF');
   db.funcionario.bulkCreate(body).then(funcionario => {
     req.user.addFuncionario(funcionario => {
       return funcionario.reload();
     }).then(funcionario => {
       return res.status(200).json(funcionario.toPublicJSON());
     }).catch(err => {
        res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
     })
   }).catch(err => {
       res.status(400).json({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
   });
}*/

api.update = (req, res) => {
  let id = parseInt(req.params.id, 10);
  let body = _.pick(req.body, 'nome', 'email', 'cargo', 'departamento', 'CPF', 'updatedAt');
  body.updatedAt = new Date();
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
          let attr = [body.nome, body.email, body.cargo, body.departamento, body.CPF, result[0].id, result[0].empresaId];
          let query = mysql.format(update, attr);
          con.query(query, function(error, result) {
              con.release();
              if (error) return res.status(400).send({Erro: error});
              return res.status(200).json(result);
          });
        } else {
          return res.status(404).send("Nenhum funcionário encontrado.");
        }
    });
  });
}


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
        if(!_.isEmpty(result)) return res.status(200).json({funcionarios: result});
        return res.status(404).send("Nenhum funcionário encontrado!");
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
        if(!_.isEmpty(result)) return res.status(200).json({funcionarios: result[0]});
        return res.status(404).send("Nenhum funcionário encontrado.");

    });
  });
}

api.delete = (req, res) => {
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
          let attr = [result[0].id, result[0].empresaId];
          let query = mysql.format(remove, attr);
          con.query(query, function(error, result) {
              con.release();
              if (error) return res.status(400).send({Erro: error});
              return res.status(200).json(result);
          });
        } else {
          return res.status(404).send("Nenhum funcionário encontrado.");
        }
    });
  });
}

module.exports = api;
