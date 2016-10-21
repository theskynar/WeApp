module.exports = function(app){

  app.post('/manager/auth.js', app.api.auth.autenticaLogin);

}
