module.exports = (app) => {
  let api = app.Estabelecimento.api.eventos;

  app.route('/v1/api/estabelecimentos/eventos')
    .get(api.list);

  app.route('/v1/api/estabelecimentos/eventos/:status')
    .get(api.listByStatus);

  app.route('/v1/api/estabelecimentos/evento/:id?')
    .get(api.listById)
    .post(api.create)
    .put(api.update)
    .delete(api.destroy);

}
