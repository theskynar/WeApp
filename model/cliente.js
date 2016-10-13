const bcrypt = require('bcrypt');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes) {
  var cliente = sequelize.define('cliente', {
    nome: {
      type:dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[2,55] /* Tamanho entre 2 e 55 incluindo ambos */
      }
    },/* END OF COLUNM NOME */
    email: {
      type:dataTypes.STRING,
      allowNull: false,
      unique: true, /* VALOR ÚNICO */
      validate: {
        isEmail: true,
      }
    },/* END OF COLUNM EMAIL */
    bairroMora: {
      type:dataTypes.STRING,
      allowNull: false,
      validate : {
        len: [2, 55]
      }
    }, /* END OF COLUNM Bairro onde mora */
    bairroTrabalha: {
      type:dataTypes.STRING,
      allowNull: false,
      validate : {
        len: [2, 55]
      }
    }, /* END OF COLUNM Bairro onde trabalha */
    cel: {
      type:dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[6, 50]
      }
    }, /* END OF COLUNM CELULAR */
    dob: {
      type:dataTypes.DATEONLY
    }, /* END OF COLUNM DATA DE NIVER - FORMATO  07-05-2016 */
  }, { /* END OF CLIENTE*/
    hooks: {
      beforeValidate: function(user, options) {
        if(typeof cliente.email === 'string') {
          cliente.email = cliente.email.toLowerCase();
        }
      }
    },
    classMethods: {
      verificar: function (body) {
        return new Promise(function (resolve, reject) {
            if(typeof body.email !== 'string' || typeof body.password !== 'string') {
                return reject();
            }
            cliente.findOne({where: {email: body.email} }).then(function(cliente) {
              if(!cliente) {
                return reject();
              }
              resolve(cliente);
            }, function(e) {
              console.log(e);
                reject();
            });
        });
      }, /* END OF autenticar */
      findByToken: function (token) {
        return new Promise(function (resolve, reject) {
          try {
              var decodeJWT = jwt.verify(token, 'qwerty');
              var bytes = cryptojs.AES.decrypt(decodeJWT.token, '12345t');
              var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
              cliente.findById(tokenData.id).then(function(cliente) {
                  if(cliente) {
                    resolve(cliente);
                  } else {
                    reject();
                  }
              }, function () {
                  reject();
              });
          } catch (e) {
              reject();
          }
        })
      }
    },
    instanceMethods: {
      toPublicJSON: function() {
        var json = this.toJSON();
        return _.pick(json, 'nome', 'email', 'cel', 'bairroMora', 'bairroTrabalha', 'dob');
      },
      genToken: function(type) {
        if(!_.isString(type)){
          return undefined;
        }
        try {
            var stringData = JSON.stringify({id: this.get('id'), type: type});
            var encryptedData = cryptojs.AES.encrypt(stringData, '12345t').toString();
            var token = jwt.sign({token: encryptedData}, 'qwerty');

            return token;
        } catch (e) {
            console.log(e);
        }
      }
    }
  });

  return cliente;
}
