module.exports = function(app) {
  let api = app.Site.api.cadastro;

  app.route('/empresas/cadastro/:adminId')
    .get(api.generateLink);

}
