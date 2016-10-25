const bcrypt = require('bcrypt');
const _ = require('underscore');

module.exports = function(sequelize, dataTypes) {
  var evento = sequelize.define('evento', {
    titulo: {
      type: dataTypes.STRING,
      allowNull:false,
      validate: {
        len:[3, 255]
      }
    },
    desc: {
      type: dataTypes.STRING,
      allowNull:false,
      validate: {
        len:[3, 255]
      }
    },

    dataInicio: {
      type: dataTypes.DATE,
      allowNull:false,
      defaultValue: dataTypes.NOW
    },

    dataFim: {
      type: dataTypes.DATE,
      allowNull:false,
      defaultValue: dataTypes.NOW
    },
    status: {
      type: dataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min:0,
        max:1
      }
    }


  });

  return evento;
}
