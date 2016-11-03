
module.exports = function (app) {
   var api = app.Dash.api.stats_v2;

  app.route('/manager/estatisticas/:type')
    .get(app.Dash.api.async.getPromises);


};
