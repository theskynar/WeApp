// TABELA PARA SALVAR HISTORICO DE COMPRAS DE UM CLIENTE, OU SEJA,
// O ESTABELECIMENTO TEM VARIOS PRODUTOS, E O PRODUTO EH COMPRADO PELO CLIENTE
// ENTAO, O ESTABELECIMENTO TEM UM PRODUTO, QUE TEM UM CLIENTE.

module.exports = function(sequelize, dataTypes) {
  var produto = sequelize.define('produto', {
    valor: {
        type: dataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
    valorTotal: {
        type: dataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
    avaliacao: {
      type: dataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 5.0,
      validate: {
        min: 1,
        max: 5
      }
    }
  });

  return produto;
}

