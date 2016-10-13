const bcrypt = require('bcrypt');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes) {
  var admin = sequelize.define('admin', {
    name: {
      type:dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[2,55] /* Tamanho entre 2 e 55 incluindo ambos */
      }
    },/* END OF COLUNM NAME */
    email: {
      type:dataTypes.STRING,
      allowNull: false,
      unique: true, /* VALOR ÚNICO */
      validate: {
        isEmail: true,
      }
    },/* END OF COLUNM EMAIL */
    img: {
      type:dataTypes.STRING
    }, /* END OF COLUNM IMG */
    salted: {
      type:dataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },/* END OF COLUNM SALTED */
    passwordHashed : {
      type:dataTypes.STRING
    },/* END OF COLUNM passhashed */
    password: {
      type:dataTypes.VIRTUAL,
      allowNull:false,
      validate: {
        len: [8,50]
      },
      set: function(val) {
        var salt = bcrypt.genSaltSync(10);
        var hashed = bcrypt.hashSync(val, salt);
        this.setDataValue('password', val);
        this.setDataValue('salted', salt);
        this.setDataValue('passwordHashed', hashed);
      }
    }/* END OF COLUNM PASSWORD */
  }, { /* END OF VAR ADMIN */
    hooks: {
      beforeValidate: function(user, options) {
        if(typeof admin.email === 'string') {
          admin.email = admin.email.toLowerCase();
        }
      }
    },
    classMethods: {
      verificar: function (body) {
        return new Promise(function (resolve, reject) {
            if(typeof body.email !== 'string' || typeof body.password !== 'string') {
                return reject();
            }
            admin.findOne({where: {email: body.email} }).then(function(admin) {
              if(!admin || !bcrypt.compareSync(body.password, admin.get('passwordHashed'))) {
                console.log("model admin + " + admin);
                return reject();
              }
              resolve(admin);
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

                admin.findById(tokenData.id).then(function(admin) {
                    if(admin) {
                      resolve(admin);
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
        return _.pick(json, 'name', 'email', 'img', 'dob');
      },
      generateToken: function(type) {
        if(!_.isString(type)){
          return undefined;
        }
        try {
            var stringData = JSON.stringify({id: this.get('id'), type: type});
            var encryptedData = cryptojs.AES.encrypt(stringData, '12345t').toString();
            var token = jwt.sign({token: encryptedData}, 'qwerty');
            return token;
        } catch (e) {
          console.error(e);
          return undefined;
        }
      }
    }
  });

  return admin;
} /* END FUNCTION */
