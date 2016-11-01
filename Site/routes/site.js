module.exports = function(app) {
  var api = app.Site.api.site;

  app.get('/', api.getIndex);
  app.get('/table', api.getTable);

  app.route('/comerciante')
    .get(api.getComerciante)
    .post(app.Site.api.contato.send);

  app.route('/consumidor')
    .get(api.getConsumidor);

  app.get('/site/compras', api.getcompras);

}
