module.exports = (app) => {
  let api = app.App.api.notification;
  app.post('/estabelecimento/notificacao', api.sendAll);
  app.post('/estabelecimento/notificacaoPorBairros', api.sendByLocation);

}
