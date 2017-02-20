module.exports = (app) => {
    let api = app.API.Estabelecimento.api.desconto;
    app.route('/v1/api/estabelecimentos/desconto')
        .post(api.genDesconto);
}