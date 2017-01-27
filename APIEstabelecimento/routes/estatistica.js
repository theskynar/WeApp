module.exports = (app) => {
  let api = app.PublicAPI.api.async;
  app.route('/v1/estatisticas/:type')
    .get(api.getPromises);
  }
