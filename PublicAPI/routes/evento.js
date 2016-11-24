module.exports = (app) => {
  let api = app.PublicAPI.api.evento;

  app.route('/v1/weapp/api/eventos')
    .get(api.listAll);

  app.route('/v1/weapp/api/evento/:id?')
    .get(api.findById)
    .post(api.create)
    .put(api.update)
    .delete(api.destroy);

}
