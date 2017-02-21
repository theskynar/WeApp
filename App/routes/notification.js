module.exports = (app) => {
  let api = app.Estabelecimento.api.notification;
  app.post('/estabelecimento/notificacao', api.sendAll);
  app.post('/estabelecimento/notificacaoPorBairro', api.sendByLocation);

}
