module.exports = function(app) {
  var api = app.api.site;

  app.get('/', api.getIndex);
  app.get('/table', api.getTable);
  app.get('/comerciante', api.getComerciante);
  app.get('/consumidor', api.getConsumidor);
}
