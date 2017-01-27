module.exports = (app) => {
  let api = app.PublicAPI.api.estatisticas_async;

  app.route('/v1/estatisticas/:type')
    .get(api.getPromises);
  }
