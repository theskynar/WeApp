const bcrypt = require('bcrypt');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes) {
  let admin = sequelize.define('admin', {
    name: {
      type:dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[2,55]
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
    level: {
      type:dataTypes.INTEGER,
      defaultValue:1,
      validate: {
        min:1,
        max:5
      }
    },
    img: {
      type:dataTypes.STRING,
      defaultValue:"https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg"
    },
    salted: {
      type:dataTypes.STRING
    },
    passwordHashed : {
      type:dataTypes.STRING
    },
    password: {
      type:dataTypes.VIRTUAL,
      allowNull:false,
      validate: {
        len: [8,50]
      },
      set: function(val) {
        console.log(val);
        let salt = bcrypt.genSaltSync(10);
        let hashed = bcrypt.hashSync(val, salt);
        this.setDataValue('password', val);
        this.setDataValue('salted', salt);
        this.setDataValue('passwordHashed', hashed);
      }
    },
    tokenReset: {
      type:dataTypes.VIRTUAL
    },
    tokenHash: {
      type:dataTypes.STRING,
      unique:true
    },
    resetDate: {
      type:dataTypes.DATE
    }
  }, { /* END OF let ADMIN */
    hooks: {
      beforeValidate: function(admin, options) {
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
                return reject();
              }
              resolve(admin);
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
        let json = this.toJSON();
        return _.pick(json, 'id', 'name', 'level', 'email', 'img', 'createdAt', 'updatedAt');
      },
      generateToken: function(type) {
        if(!_.isString(type)){
          return undefined;
        }
        try {
            let stringData = JSON.stringify({id: this.get('id'), email: this.get('email'), type: type});
            let encryptedData = cryptojs.AES.encrypt(stringData, '12345t').toString();
            let token = jwt.sign({token: encryptedData}, 'qwerty');
            return token;
        } catch (e) {
          return undefined;
        }
      },
      resetTokenHashed: function(token) {
        this.tokenReset = token;
        this.update({
          tokenHash: cryptojs.MD5(this.tokenReset).toString(),
          resetDate: new Date().getTime()
        })
      },
      resetPass: function() {
        this.password = null;
        this.update({
          passwordHashed: null,
          salted: null
        })
      },
      passwordTokenExpired: function() {
        let later = new Date().getTime() - 900000;
        return new Date(this.resetDate).getTime() < later;
      }
    }
  });

  return admin;
} /* END FUNCTION */
