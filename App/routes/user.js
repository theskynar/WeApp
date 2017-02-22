module.exports = function(app) {

  let api = app.App.api.cliente;

  app.route('/mobile/usuario/:id?')
     .put(api.update)
     .delete(api.delete);

  app.route('/mobile/desconto')
     .post(api.gerarDesconto);

  app.route('/mobile/descontos/:id')
     .get(api.listarDescontos);

}
