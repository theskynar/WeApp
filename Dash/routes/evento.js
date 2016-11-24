module.exports = function(app) {

  var api = app.Dash.api.evento;

  app.route('/manager/eventos')
    .get(api.list);

  app.route('/manager/evento/:id?')
    .get(api.getById)
    .post(api.create)
    .put(api.update);

  /*app.route('/manager/evento/:status')
    .get(app.Dash.api.evento.getByStatus);*/

}
