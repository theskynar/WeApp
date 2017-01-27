module.exports = (app) => {
  let api = app.Empresas.api.cupom;
  app.route('/v1/empresas/cupom/:id')
    .get(api.list)
    .post(api.create)
    .put(api.update)
    .delete(api.delete);
}
