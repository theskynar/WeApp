module.exports = function(app){

  var api = app.Dash.api.auth;
  app.post('/manager/auth.js', api.autenticaLogin);
  // /app.use('/manager/*', app.Dash.api.auth.verificarToken);

}
