module.exports = function(app) {
  var cliente = app.api.cliente;
  var estabelecimento = app.api.estabelecimento;
  // RESTANDO TOLEN FACEBOOK;

  app.route('/mobile/estabelecimentos')
     .get(estabelecimento.getAllEstabelecimentos);

  app.route('/mobile/verUsuario')
     .post(cliente.autenticaUser);

  app.route('/mobile/usuario')
     .post(cliente.cadastraUser);

  app.route('/mobile/usuario/:id')
     .put(cliente.atualizaUser);

  app.route('/mobile/desconto')
     .post(cliente.gerarDesconto);
}
