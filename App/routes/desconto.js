module.exports = (app) => {
  let api = app.Estabelecimento.api.desconto;
  app.route('/estabelecimento/desconto')
    .post(api.genDesconto);
}
