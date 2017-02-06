module.exports = function(app){
  let api = app.App.api.authorize;
  app.post('/auth', api.autentica);
  app.use('/*', api.verificarToken);
}
