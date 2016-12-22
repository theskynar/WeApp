module.exports = function(app) {

  let api = app.App.api.estabelecimento;

  app.get('/mobile/estabelecimentos', api.list);


}
