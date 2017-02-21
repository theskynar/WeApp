module.exports = (app) => {
  let api = app.App.api.async;
  app.route('/estabelecimento/estatisticas/:type')
    .get(api.getPromises);
  }
