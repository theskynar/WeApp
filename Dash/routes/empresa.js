module.exports = function(app){

  let api = app.Dash.api.empresa;

  app.route('/manager/empresas')
    .get(api.list);

  app.route('/manager/empresa/:id?')
    .get(api.getById)
    .post(api.create)
    .put(api.update);

  app.route('/manager/novoTokenEmpresa/:id?')
    .put(api.generateBearerToken);

}
