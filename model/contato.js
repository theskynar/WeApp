module.exports = function(sequelize, dataTypes) {
  var contato = sequelize.define('contato', {
    nome: {
      type: dataTypes.STRING,
      validate:{
        len:[0,255]
      }
    },
    email: {
      type: dataTypes.STRING,
      validate:{
        len:[0,100]
      }
    },
    empresa: {
      type: dataTypes.STRING,
      validate:{
        len:[0,100]
      }
    },
    telefone: {
      type: dataTypes.STRING,
      validate:{
        len:[0,30]
      }
    },
    assunto: {
      type: dataTypes.STRING,
      validate:{
        len:[0,60]
      }
    },
    msg: {
      type: dataTypes.STRING,
      validate:{
        len:[0,255]
      }
    },
    status: {
      type: dataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 0,
        max: 1
      }
    }
  });

  return contato;
}
