module.exports = function(app) {
  app.route('/manager/sorteio')
    .get(app.Dash.api.premios.randomPrize);
}
