module.exports = function(app) {
  // RESTANDO TOLEN FACEBOOK;

  app.route('/mobile/verUsuario')
     .post(app.App.api.cliente.autenticaCliente);

  app.post('/mobile/usuario/:id?', app.App.api.cliente.cadastraUser);

  app.use('/mobile/*', app.App.api.auth.autentica);

  app.route('/mobile/estabelecimentos')
     .get(app.App.api.estabelecimento.list);

  app.route('/mobile/usuario/:id?')
     .put(app.App.api.cliente.atualizaUser)
     .delete(app.App.api.cliente.delete);

  app.route('/mobile/desconto')
     .post(app.App.api.cliente.gerarDesconto);

  app.route('/mobile/eventos')
     .get(app.App.api.evento.getByStatus);
}
