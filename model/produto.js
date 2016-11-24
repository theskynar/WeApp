// TABELA PARA SALlet HISTORICO DE COMPRAS DE UM CLIENTE, OU SEJA,
// O ESTABELECIMENTO TEM letIOS PRODUTOS, E O PRODUTO EH COMPRADO PELO CLIENTE
// ENTAO, O ESTABELECIMENTO TEM UM PRODUTO, QUE TEM UM CLIENTE.

module.exports = function(sequelize, dataTypes) {
  let produto = sequelize.define('produto', {
    valor: {
        type: dataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 20.0
      },
    valorTotal: {
        type: dataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 50.0
      },
    desconto: {
      type:dataTypes.DOUBLE
    },
    avaliacao: {
      type: dataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 5.0,
      validate: {
        min: 1,
        max: 5
      }
    },
    isChecked: {
      type: dataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false
    },
  }, {
      hooks: {
        beforeCreate: function(produto, options) {
            let valDesconto = produto.valorTotal - produto.valor;
            produto.desconto = valDesconto;
        }
      }
  });

  return produto;
}
