const cryptojs = require('crypto-js');

module.exports = function(sequelize, dataTypes) {

  let cupom =  sequelize.define('cupom', {
    cupom: {
      type: dataTypes.STRING,
    },
    dataInicio: {
      type:dataTypes.DATE
    },
    dataFim: {
      type:dataTypes.DATE
    },
    descricao: {
      type:dataTypes.TEXT
    }
  });

  return cupom;
}
