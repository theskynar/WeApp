module.exports = (app) => {
  let api = app.App.api.eventos;

  app.route('/estabelecimento/eventos')
    .get(api.list);

  app.route('/estabelecimento/eventos/:status')
    .get(api.listByStatus);

  app.route('/estabelecimento/evento/:id?')
    .get(api.listById)
    .post(api.create)
    .put(api.update)
    .delete(api.destroy);

}
