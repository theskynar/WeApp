module.exports = function(app){

  app.route('/manager/user/:id?')
    .put(app.Dash.api.user.update)
    .get(app.Dash.api.user.getUserById)
    .post(app.Dash.api.user.createUser)
    .delete(app.Dash.api.user.delete);

  app.route('/manager/users/:type?')
    .get(app.Dash.api.user.list);



}
