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
    genero: {
      type:dataTypes.CHAR(1),
      allowNull:false
    },
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
    /*ruaMora: {
      type:dataTypes.STRING,
      defaultValue: "xyz"
    },*/
    cel: {
      type:dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[6, 50]
      }
    }, /* END OF COLUNM CELULAR */
    dob: {
      type:dataTypes.DATE
    }, /* END OF COLUNM DATA DE NIVER - FORMATO  07-05-2016 */
  }, { /* END OF CLIENTE*/
    hooks: {
      beforeValidate: function(cliente, options) {
        if(typeof cliente.email === 'string') {
          cliente.email = cliente.email.toLowerCase();
        }
      }
    },
    classMethods: {
      verificar: function (body) {
        return new Promise(function (resolve, reject) {
            if(typeof body.email !== 'string') {
                return reject();
            }
            cliente.findOne({
		where: {
			email: body.email
	    	}
	    }).then(function(cliente) {
              if(!cliente) {
                return reject();
              }
              resolve(cliente);
            }, function(e) {
                reject();
            });
        });
      }, /* END OF autenticar */
      findByToken: function (token) {
        return new Promise(function (resolve, reject) {
          try {
              var decodeJWT = jwt.verify(token, 'fuckingAssHolexxx123452323');
              var bytes = cryptojs.AES.decrypt(decodeJWT.token, 'fuckingAssHolexxx12345');
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
        return _.pick(json, 'nome', 'email', 'genero', 'cel', 'bairroMora', 'bairroTrabalha', 'dob');
      },
      genToken: function(type) {
        if(!_.isString(type)){
          return undefined;
        }
        try {
            var stringData = JSON.stringify({id: this.get('id'), type: type});
            var encryptedData = cryptojs.AES.encrypt(stringData, 'fuckingAssHolexxx12345').toString();
            var token = jwt.sign({token: encryptedData}, 'fuckingAssHolexxx123452323');

            return token;
        } catch (e) {
          throw new Error(e);
        }
      }
    }
  });

  return cliente;
}
