module.exports = function(app){

  app.route('/manager/estabelecimentos')
    .get(app.api.estabelecimento.list);

  app.route('/manager/estabelecimento/:id?')
    .get(app.api.estabelecimento.getById)
    .post(app.api.estabelecimento.create)
    .put(app.api.estabelecimento.update);


}
