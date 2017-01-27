const bcrypt = require('bcrypt');
const _ = require('underscore');

module.exports =  function(sequelize, dataTypes) {
  let notificacao = sequelize.define('notificacao', {
    titulo: {
      type: dataTypes.STRING,
      allowNull:false,
      validate: {
        len:[3, 255]
      }
    },
    subtitulo: {
      type: dataTypes.STRING,
      allowNull:false,
      validate: {
        len:[1, 50]
      }
    },
    descricao: {
      type: dataTypes.STRING,
      allowNull:false,
      validate: {
        len:[3, 255]
      }
    },
    bairros: {
      type:dataTypes.STRING
    },
    texto: {
      type: dataTypes.STRING,
      allowNull:false,
      validate: {
        len:[3, 255]
      }
    },
    dataEnvio: {
      type: dataTypes.STRING,
      validate: {
        len:[3, 255]
      }
    }
  });

  return notificacao;
}
