module.exports = function(app) {

  app.route('/manager/eventos')
    .get(app.Dash.api.evento.list);

  app.route('/manager/evento/:id?')
    .get(app.Dash.api.evento.getById)
    .post(app.Dash.api.evento.create)
    .put(app.Dash.api.evento.update);

  /*app.route('/manager/evento/:status')
    .get(app.Dash.api.evento.getByStatus);*/

}
