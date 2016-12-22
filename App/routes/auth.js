let cookieParser = require('cookie-parser');
let csrf = require('csurf');
let bodyParser = require('body-parser');

module.exports = (app) => {
  let api = app.App.api.auth;
  let csrfProtection = csrf({ cookie: true });
  let parseForm = bodyParser.urlencoded({ extended: false });
  app.use(cookieParser());

  app.post('/mobile/usuario', parseForm, csrfProtection,  app.App.api.cliente.create);
  app.post('/mobile/verUsuario', parseForm, csrfProtection, api.autenticaCliente);
  app.use('/mobile/*', api.autentica);

}
