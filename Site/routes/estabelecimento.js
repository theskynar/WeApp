module.exports = (app) => {

  let api = app.Site.api.estabelecimento;

  app.get('/estabelecimentos', api.list);

}
