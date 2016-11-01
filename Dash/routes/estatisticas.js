module.exports = function (app) {
  app.route('/manager/stats/:id?')
    .get(app.Dash.api.estatistica.getCompras)
    .get(app.Dash.api.estatistica.getComprasByEstabelecimentoId);

  /*app.route('/manager/stats/clients/:id?')
    .get(app.Dash.api.estatistica.getAll)
    .get(app.Dash.api.estatistica.getById);*/
};
