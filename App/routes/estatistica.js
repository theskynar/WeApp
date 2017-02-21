module.exports = (app) => {
  let api = app.Estabelecimento.api.async;
  app.route('/estabelecimento/estatisticas/:type')
    .get(api.getPromises);
  }
