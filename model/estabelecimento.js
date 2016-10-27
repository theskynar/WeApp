
const bcrypt = require('bcrypt');
const _ = require('underscore');

module.exports = function(sequelize, dataTypes) {
	var estabelecimento = sequelize.define('estabelecimento', {
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
	}, {
			instanceMethods: {
				toPublicJSON : function() {
					var json = this.toJSON();
					return _.pick(json, 'nomeEmpresa', 'segmento', 'cidade', 'bairro',
						'descontoAplicado', 'url', 'urlFace');
				}
			}
	});

	return estabelecimento;

}
