const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

module.exports = function(sequelize, dataTypes) {
	let estabelecimento = sequelize.define('estabelecimento', {
		CNPJ: {
			type: dataTypes.STRING,
			allowNull:false,
			validate: {
				len: [1,255]
			}
		},
		Tel: {
			type: dataTypes.STRING,
			allowNull: false,
			validate: {
				len:[1]
			}
		},
		email: {
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
		nomeProprietario: {
			type: dataTypes.STRING,
			allowNull: false,
			validate: {
				len: [2, 255]
			}
		},
		segmento: {
			type: dataTypes.STRING,
			allowNull:false,
			validate: {
				len:[2, 255]
			}
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
				isNumeric:true,
				len: [3, 25]
			}
		},
		url: {
			type: dataTypes.STRING
		},
		urlFace: {
			type: dataTypes.STRING
		},
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
		premiosSorteados: {
			type: dataTypes.STRING,
			allowNull: false,
			defaultValue: "0"
		},
		capitalRodado: {
			type: dataTypes.DOUBLE,
			allowNull:false,
			defaultValue:0.0
		},
		descontoAplicado: {
			type:dataTypes.DOUBLE,
			allowNull:false,
			defaultValue: 5.0,
			validate: {
				min: 5.0,
				max: 100.0
			}
		},
		localizacao: {
			type:dataTypes.STRING,
			defaultValue:"Coordenadas para Google Maps"
		},
		img: {
			type:dataTypes.STRING,
			defaultValue:"https://forums.roku.com/styles/canvas/theme/images/no_avatar.jpg"
		},
		token: {
      type: dataTypes.STRING,
    },
    tokenHash: dataTypes.STRING,
	}, {
		hooks: {
			beforeCreate: function(estabelecimento, options) {
					obj: {estabelecimento.CNPJ, estabelecimento.nomeProprietario, estabelecimento.id}
					try {
						let token = jwt.sign(estabelecimento.CNPJ, 'secr3t');
						estabelecimento.token = token;
					} catch(e) {
						throw new Error('Erro ao assinar token: ' + e);
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
					try {
					let decodeJWT = jwt.verify(token, 'secr3t');
					process.nextTick(function() {
						estabelecimento.findOne({
							where: {
								token:token
							}
						})
						.then((res) =>{
							if(res) return cb(null, res);
							return cb(null,null);
						})
				  });
				} catch (e) {
					throw new Error('Erro ao verificar token ' + e);
				}
			}


    },
			instanceMethods: {
				toPublicJSON : function() {
					try {
					let json = this.toJSON();
					return _.pick(json, 'nomeEmpresa', 'segmento', 'cidade', 'bairro',
						'descontoAplicado', 'url', 'urlFace');
					} catch (e) {
						throw new Error('Erro ao converter JSON Objects ' + e);
					}
				}
			},
	});

	return estabelecimento;

}
