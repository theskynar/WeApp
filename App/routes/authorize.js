module.exports = function(app){
  let api = app.App.api.auth;
  app.post('/auth', api.autentica);
  app.use('/*', api.verificarToken);
  app.use('/estabelecimento/*', api.verificaTokenEstab);
  app.use('/empresa/*', api.verificarTokenEmpresa);
}
