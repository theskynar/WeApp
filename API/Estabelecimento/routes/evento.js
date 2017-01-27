module.exports = (app) => {
  let api = app.Estabelecimento.api.eventos;

  app.route('/v1/api/eventos')
    .get(api.list);

  app.route('/v1/api/eventos/:status')
    .get(api.listByStatus);

  app.route('/v1/api/evento/:id?')
    .get(api.listById)
    .post(api.create)
    .put(api.update)
    .delete(api.destroy);

}
