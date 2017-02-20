module.exports = (app) => {
    let api = app.API.Estabelecimento.api.async;
    app.route('/v1/api/estabelecimentos/estatisticas/:type')
        .get(api.getPromises);
}