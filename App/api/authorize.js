const jwt = require('jsonwebtoken');
const async = require('async');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const apiConfig = require('../../Util/config.js');
let api = {};


module.exports = function(app, db, _) {

  api.autentica = function(req, res) {
    let body = _.pick(req.body, 'email', 'password');
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    let insertEstabelecimento = ['estabelecimento', 'email', body.email];
    let insertEmpresa = ['empresa', 'emailEmpresa', body.email];
    let sqlEstab = mysql.format(sql, insertEstabelecimento);
    let sqlEmpresa = mysql.format(sql, insertEmpresa);

      db.getConnection(function(err, con) {
        if (err) {
          con.release();
          res.status(500).send({status: "Erro ao estabelecer conexão com o banco.", erro: err});
        }
        con.query(`${sqlEstab};${sqlEmpresa}`, function (error, results, fields) {
            if (error) return res.status(400).send({Erro: error});
            if(_.isEmpty(results[1]) && _.isEmpty(results[0])) return res.status(401).send("Usuário não autorizado!");
            if(_.isEmpty(results[1]) && !_.isEmpty(results[0])) {
              try {
                let token = jwt.sign({id: results[0][0].id, tipo: 'estabelecimento'}, 'segredo', {expiresIn: 60*40});
                res.set('x-access-token', token);
                con.release();
                return res.status(200).json({Estabelecimento: results[0][0]});
              } catch(e) {
                return res.status(400).send({Erro: e.toString()});
              }
            }

        });
      });
  }

  api.verificarToken = function(req, res, next) {
    var token = req.headers['x-access-token'];
    if(token) {
      jwt.verify(token, 'segredo', function(err, decoded) {
          if(err) {
            res.status(401).send("Unauthorized");
          }
          req.user = decoded;
          next();
      });
    } else {
      res.status(401).send('Não Autorizado');
    }
  }

  return api;
};
