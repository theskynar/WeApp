module.exports = function (app) {

  let api = app.Dash.api.async;

  app.get('/manager/estatisticas/:type', api.getPromises)
};
