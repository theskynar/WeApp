module.exports = function(app){

  app.get('/manager/notificacoes', app.Dash.api.notificacao.list);

  app.route('/manager/notificacao')
     .post(app.Dash.api.notificacao.send);

}
