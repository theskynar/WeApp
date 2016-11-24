module.exports = function(app) {

  var api = app.Dash.api.premios;

  app.route('/manager/sorteio')
    .get(api.randomPrize);
}
