module.exports = function(app){

  app.route('/manager/estabelecimentos')
    .get(app.Dash.api.estabelecimento.list);

  app.route('/manager/estabelecimento/:id?')
    .get(app.Dash.api.estabelecimento.getById)
    .post(app.Dash.api.estabelecimento.create)
    .put(app.Dash.api.estabelecimento.update);


}
