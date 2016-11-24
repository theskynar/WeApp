module.exports = (app) {
  let api = app.PublicAPI.api.notification;

  app.route('/v1/weapp/api/notificacoes')
    .get(api.listAll);

  app.route('v1/weapp/api/notificacao/:id?')
    .get(api.findById)
    .post(api.create)
    .put(api.update)
    .delete(api.destroy);

};
