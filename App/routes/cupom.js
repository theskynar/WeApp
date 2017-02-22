module.exports = (app) => {
  let api = app.App.api.cupom;
  app.route('/empresa/cupom/:id?')
    .post(api.create)
    .get(api.listById)
    .put(api.update)
    .delete(api.delete);
  app.route('/empresa/cupons')
    .get(api.list);
}
