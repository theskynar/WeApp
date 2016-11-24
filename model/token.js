const cryptojs = require('crypto-js');

module.exports = function(sequelize, dataTypes) {

  let token =  sequelize.define('token', {
    token: {
      type: dataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len:[1]
      },
      set: function(value) {
        let hash =  cryptojs.MD5(value).toString();
        this.setDataValue('token', value);
        this.setDataValue('tokenHash', hash);
      }
    },
    tokenHash: dataTypes.STRING
  });

  return token;
}
