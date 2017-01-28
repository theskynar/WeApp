module.exports = (app) => {
  let api = app.Estabelecimento.api.notification;
  app.post('/v1/api/estabelecimentos/notificacao', api.sendAll);
  app.post('/v1/api/estabelecimentos/notificacaoPorBairro', api.sendByLocation);

}
