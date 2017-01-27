module.exports = (app) => {
  let api = app.Estabelecimento.api.async;
  app.route('/v1/api/estatisticas/:type')
    .get(api.getPromises);
  }
