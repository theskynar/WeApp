module.exports = (app) => {
  let api = app.PublicAPI.api.eventos;

  app.route('/v1/eventos')
    .get(api.list);

  app.route('/v1/eventos/:status')
    .get(api.listByStatus);

  app.route('/v1/evento/:id?')
    .get(api.listById)
    .post(api.create)
    .put(api.update)
    .delete(api.destroy);

}
