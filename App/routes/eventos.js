module.exports = function(app) {
  let api = app.App.api.evento;
  app.route('/mobile/eventos')
     .get(api.getByStatus);
}
