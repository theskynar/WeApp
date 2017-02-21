module.exports = (app) => {
  let api = app.App.api.desconto;
  app.route('/estabelecimento/desconto')
    .post(api.genDesconto);
}
