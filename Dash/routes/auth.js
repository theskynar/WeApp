module.exports = function(app){

  let api = app.Dash.api.auth;
  app.post('/manager/auth.js', api.autenticaLogin);
  // /app.use('/manager/*', app.Dash.api.auth.verificarToken);

}
