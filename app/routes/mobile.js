module.exports = function(app) {
  let api = app.api.mobile;
  // RESTANDO TOLEN FACEBOOK;

  app.get('/mobile/estabelecimentos', api.getAllEstabelecimentos);
  //app.get('/mobile/minhasCompras', cliente.getCompras);
  app.post('/mobile/verificarUsuario', api.autenticaUser);
  app.post('/mobile/cadastrarUsuario', api.cadastraUser);
  app.put('/mobile/atualizarUsuario', api.atualizaUser);
}
