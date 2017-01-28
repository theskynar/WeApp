module.exports = (app) => {
  let api = app.Estabelecimento.api.desconto;
  app.route('/v1/api/estabelecimentos/desconto')
    .post(api.genDesconto);
}
