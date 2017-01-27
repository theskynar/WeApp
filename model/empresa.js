const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes) {
	let empresa = sequelize.define('empresa', {
		CNPJ: {
			type: dataTypes.STRING,
			allowNull:false,
			validate: {
				len: [1,255]
			}
		},
    telResponsavel: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[1]
      }
    },
		emailResponsavel: {
			type: dataTypes.STRING,
			allowNull: false,
			unique: true, /* VALOR ÚNICO */
			validate: {
				isEmail: true
			}
		},
    telEmpresa: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        len:[1]
      }
    },
    emailEmpresa: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true, /* VALOR ÚNICO */
      validate: {
        isEmail: true
      }
    },
		nomeEmpresa: {
			type:dataTypes.STRING,
			allowNull:false,
			validate: {
				len: [1, 255]
			}
		},
    nomeFantasia: {
      type:dataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1, 255]
      }
    },
    nomeResponsavel: {
      type:dataTypes.STRING,
      allowNull:false,
      validate: {
        len: [1, 255]
      }
    },
		endereco: {
			type: dataTypes.STRING,
			allowNull:false
		},
		cidade: {
			type: dataTypes.STRING,
			allowNull:false,
			validate: {
				len:[2, 40]
			}
		},
		bairro: {
			type: dataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 50]
			}
		},
		CEP: {
			type: dataTypes.STRING,
			allowNull:false,
			validate: {
				len: [3, 25]
			}
		},
		url:dataTypes.STRING,
    plano:dataTypes.STRING,
		dataEntrada: {
			type: dataTypes.DATE,
			allowNull: false,
			defaultValue: dataTypes.NOW,
			validate: {
				isDate: true
			}
		},
		vencPlano: {
			type: dataTypes.DATE,
			allowNull: false,
			validate: {
				isDate: true
			}
		},
		levelPlano: {
			type:dataTypes.INTEGER,
			defaultValue: 1,
			validate: {
				min: 1,
				max: 10
			}
		},
		img: {
			type:dataTypes.STRING,
			defaultValue:"https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg"
		},
		token_teste:dataTypes.STRING,
		token: {
			type: dataTypes.VIRTUAL,
			validate: {
				len:[1]
			},
			set: function(value) {
				let hash =  cryptojs.MD5(value).toString();
				this.setDataValue('token', value);
				this.setDataValue('tokenHash', hash);
				this.setDataValue('token_teste', value);
			}
		},
		tokenHash: dataTypes.STRING,
    salted: dataTypes.STRING,
    passwordHashed:dataTypes.STRING,
    passwordCrypto:dataTypes.STRING,
    password: {
      type:dataTypes.VIRTUAL,
      allowNull:false,
      validate: {
        len: [8,50]
      },
      set: function(val) {
        let salt = bcrypt.genSaltSync(10);
        let hashed = bcrypt.hashSync(val, salt);
        let crypto = cryptojs.AES.encrypt(val.toString(), "provisorio");
        this.setDataValue('password', val);
        this.setDataValue('salted', salt);
        this.setDataValue('passwordHashed', hashed);
        this.setDataValue('passwordCrypto', crypto);
      }
    }
	}, {
		hooks: {
			beforeCreate: function(empresa, options) {
        if(typeof empresa.email === 'string') {
          empresa.email = empresa.email.toLowerCase();
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
			findByToken: function(token, cb) {
					process.nextTick(function() {
						empresa.findOne({
							where: {
								tokenHash:cryptojs.MD5(token).toString()
							}
						})
						.then(res =>{
							if(res) return cb(null, res);
							return cb(null,null);
						})
						.catch(err => {
							throw new Error(err);
						})
					});
			}


		},
		instanceMethods: {
			toPublicJSON : function() {
				try {
					let json = this.toJSON();
					return _.pick(json, 'id', 'nomeEmpresa', 'nomeFantasia', 'nomeResponsavel', 'telResponsavel',
           'emailResponsavel', 'emailEmpresa', 'endereco','vencPlano', 'dataEntrada', 'plano', 'levelPlano');
				} catch (e) {
					throw new Error('Erro ao converter JSON Objects ' + e);
				}
			}
		},
	});

	return empresa;

}
