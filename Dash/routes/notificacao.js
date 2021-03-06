module.exports = function(app){

  let api = app.Dash.api.notificacao;

  app.get('/manager/notificacoes', api.list);

  app.route('/manager/notificacao')
     .post(api.sendAll);

  app.route('/manager/notificacaoPorBairros')
     .post(api.sendByLocation);

}
