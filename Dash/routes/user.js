module.exports = function(app){

  var api = app.Dash.api.user;

  app.route('/manager/user/:id?')
    .put(api.update)
    .get(api.getUserById)
    .post(api.createUser)
    .delete(api.delete);

  app.route('/manager/users/:type?')
    .get(api.list);

}
