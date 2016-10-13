// TABELA PARA SALVAR HISTORICO DE COMPRAS DE UM CLIENTE, OU SEJA,
// O ESTABELECIMENTO TEM VARIOS PRODUTOS, E O PRODUTO EH COMPRADO PELO CLIENTE
// ENTAO, O ESTABELECIMENTO TEM UM PRODUTO, QUE TEM UM CLIENTE.

module.exports = function(sequelize, dataTypes) {
  var produto = sequelize.define('produto', {
    descricao: {
        type: dataTypes.STRING,
        allowNull: false,
        validate: {
            len:[2, 250]
        }
      },/* AQUI NA DESCRICAO, PODE IR O ESTABELECIMENTO */
    valor: {
        type: dataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
    totalCliente: {
        type: dataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
      },
    descontoAplicado: {
      type: dataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0
    },
    totalGeradoDesconto: {
      type: dataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0
    }
  });
  return produto;
}
