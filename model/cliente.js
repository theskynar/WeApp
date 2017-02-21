const bcrypt = require('bcrypt');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes) {
	let cliente = sequelize.define('cliente', {
		nome: {
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
		},
		bairroTrabalha: {
			type:dataTypes.STRING,
			allowNull: false,
			validate : {
				len: [2, 55]
			}
		},
		ruaMora: {
      type:dataTypes.STRING,
      defaultValue: "Nenhuma informação"
    },
		cel: {
			type:dataTypes.STRING,
			allowNull: false,
			validate: {
				len:[6, 50]
			}
		},
		dob: {
			type:dataTypes.DATE
		},
		notificacoes: {
			type:dataTypes.BOOLEAN,
			defaultValue: true
		},
		one_signal_id: {
			type: dataTypes.STRING
		}

	}, {
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
						let decodeJWT = jwt.verify(token, 'fuckingAssHolexxx123452323');
						let bytes = cryptojs.AES.decrypt(decodeJWT.token, 'fuckingAssHolexxx12345');
						let tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
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
				let json = this.toJSON();
				return _.pick(json, 'nome', 'email', 'genero', 'cel', 'bairroMora', 'bairroTrabalha', 'dob', 'notificacao');
			},
			genToken: function(type) {
				if(!_.isString(type)){
					return undefined;
				}
				try {
					let stringData = JSON.stringify({id: this.get('id'), type: type});
					let encryptedData = cryptojs.AES.encrypt(stringData, 'fuckingAssHolexxx12345').toString();
					let token = jwt.sign({token: encryptedData}, 'fuckingAssHolexxx123452323');

					return token;
				} catch (e) {
					throw new Error(e);
				}
			}
		}
	});

	return cliente;
}
