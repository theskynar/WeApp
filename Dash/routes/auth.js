module.exports = function(app){

  app.post('/manager/auth.js', app.Dash.api.auth.autenticaLogin);
  // /app.use('/manager/*', app.Dash.api.auth.verificarToken);

}
