module.exports = (app) => {
  let api = app.App.api.funcionario;
  app.route('/funcionarios')
    .get(api.list);
    //.post(api.bulkCreate);

  app.route('/funcionario/:id?')
    .get(api.listById)
    .post(api.create)
    .put(api.update)
    .delete(api.delete);
}
