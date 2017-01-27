module.exports = (app) => {
  let api = app.PublicAPI.api.notification;
  app.post('/v1/notification', api.send);

}
