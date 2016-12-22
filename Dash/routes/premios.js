module.exports = function(app) {

  let api = app.Dash.api.premios;

  app.route('/manager/sorteio/:qtd')
    .get(api.randomPrize2);
}
