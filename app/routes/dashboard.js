module.exports = function(app) {
  const admin = app.api.dashboard;
  const login  = app.api.login;

  app.get('/login', login.getLogin);//PEGA LOGIN
  app.post('/login', login.autenticaLogin); // POST NO LOGIN;
  app.use('/dashboard', login.verificarToken);//AUTENTICA

  app.get('/dashboard', admin.getDashboard);//REDIRECIONAR VIA ANGULAR;
  app.post('/dashboard/createUser', admin.createUser);
  app.delete('/dashboard/logout',  admin.logout);
}
