module.exports = function(app){

  app.route('/manager/notificacao')
     .post(app.Dash.api.notificacao.send);

}
