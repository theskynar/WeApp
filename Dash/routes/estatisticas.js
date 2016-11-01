module.exports = function (app) {
  app.route('/manager/compras')
    .get(app.Dash.api.estatistica.getComprasMes);

  app.route('/manager/clientes')
    .get(app.Dash.api.estatistica.getUsersMes);

  app.route('/manager/estabelecimentoEstatistica')
     .get(app.Dash.api.estatistica.getEstabelecimentoMes);
};
