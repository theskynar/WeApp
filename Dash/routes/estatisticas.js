module.exports = function (app) {

  var api = app.Dash.api.async;

  app.get('/manager/estatisticas/:type', api.getPromises)
};
