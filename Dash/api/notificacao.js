const config = require('../../config/notifications.js');
const https = require('https');
var api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {


  api.send = (req, res) => {
    var body = _.pick(req.body, 'titulo', 'subtitulo', 'descricao', 'texto', 'adminId');
    var message = {
      app_id: config.appKey,
      included_segments: ["All"]
    };

    message.contents = {"en": body.texto};
    message.headings = {"en": body.titulo};
    message.subtitle = {"en": body.subtitulo};

    //message.send_after = body.dataEnvio;
    //SENDING via NODE HTTP CORE

    var sendNotification = (data) => {
      var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic " + config.restApiKey
      };

      var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };

      var request = https.request(options, function(response) {
        response.on('data', function(data) {
          db.notificacao.create(body).then((notificacao) => {
            if(!!notificacao) res.send(data);
            else res.send('Houve um erro');
          }, function (err) {
            res.status(500).send(err);
          }); // fim grava no banco
        });// Fim response data
      }); // fim resquest

      request.on('error', function(e) {
        throw new Error(e);
      });

      request.write(JSON.stringify(data));

      request.end();

    };
    /* FIM FUNCAO ENVIO */

    sendNotification(message);
  };

  api.list = (req, res) => {
    db.notificacao.findAll({
      include: [db.admin]
    }).then((notifications) => {
      if(!!notifications) return res.status(200).json(notifications);
      res.status(404).send('Nenhuma notifcação encontrada.');
    }).catch((err) => {
      res.status(500).send(err);
    })
  };


  return api;
}
