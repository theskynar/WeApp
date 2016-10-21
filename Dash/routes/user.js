module.exports = function(app){

  app.route('/manager/user/:id?')
    .put(app.api.user.update)
    .get(app.api.user.getUserById)
    .post(app.api.user.createUser);

  app.route('/manager/users/:type?')
    .get(app.api.user.list);


}
