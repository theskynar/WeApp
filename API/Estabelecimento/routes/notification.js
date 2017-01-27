module.exports = (app) => {
  let api = app.Estabelecimento.api.notification;
  app.post('/v1/api/notificacao', api.sendAll);
  app.post('/v1/api/notificacaoPorBairro', api.sendByLocation);

}
