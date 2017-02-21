const bcrypt = require('bcrypt');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes) {
  let funcionario = sequelize.define('funcionario', {
    nome: {
      type:dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[2,255]
      }
    },
    email: {
      type:dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    cargo: {
      type:dataTypes.STRING,
      validate: {
        len:[2,255]
      }
    },
    departamento: {
      type:dataTypes.STRING,
      validate: {
        len:[2,255]
      }
    },
    CPF: {
      type: dataTypes.STRING,
      unique:true,
      allowNull:false
    }
  }, { /* END OF let funcionario */
    hooks: {
      beforeValidate: function(funcionario, options) {
        if(typeof funcionario.email === 'string') {
          funcionario.email = funcionario.email.toLowerCase();
        }
      }
    },
    classMethods: {
      verificar: function (body) {
        return new Promise(function (resolve, reject) {
            if(typeof body.email !== 'string' || typeof body.password !== 'string') {
                return reject();
            }
            funcionario.findOne({where: {email: body.email} }).then(function(funcionario) {
              if(!funcionario || !bcrypt.compareSync(body.password, funcionario.get('passwordHashed'))) {
                return reject();
              }
              resolve(funcionario);
            }, function(e) {
                reject();
            });
        });
      }, /* END OF autenticar */
      findByToken: function (token) {
          return new Promise(function (resolve, reject) {
            try {
                let decodeJWT = jwt.verify(token, 'qwerty');
                let bytes = cryptojs.AES.decrypt(decodeJWT.token, '12345t');
                let tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

                funcionario.findById(tokenData.id).then(function(funcionario) {
                    if(funcionario) {
                      resolve(funcionario);
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
        let json = this.toJSON();
        return _.pick(json, 'id', 'nome', 'email', 'departamento', 'cargo', 'createdAt', 'updatedAt');
      }
    }
  });

  return funcionario;
} /* END FUNCTION */
