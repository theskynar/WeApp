module.exports = function(app){

  let api = app.Dash.api.estabelecimento;

  app.route('/manager/estabelecimentos')
    .get(api.list);

  app.route('/manager/estabelecimento/:id?')
    .get(api.getById)
    .post(api.create)
    .put(api.update);

  app.route('/manager/novoTokenEstabalecimento/:id?')
    .put(api.generateBearerToken);

}
