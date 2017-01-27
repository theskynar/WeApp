module.exports = (app) => {
  let api = app.Dash.api.password_reset;
  app.route('/admin/password_reset/:token')
    .get(api.resetPage)
    .post(api.changePassword);
  app.post('/admin/password_reset', api.reset);

}
