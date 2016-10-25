const restApiKey = 'ZTdmOTAyNGYtZmYxNi00OTc3LWI2MjktYjhhM2VmMzJkYzQw';
const appKey = '240ee338-aac8-4c32-a872-4d4437df97c2';
const app_id = '524878552485';
const https = require('https');
const _ = require('underscore');
const db = require('./../../db.js');

module.exports = function(app) {
  var api = {};

  api.send = function(req, res) {
    var body = _.pick(req.body, 'titulo', 'subtitulo', 'descricao', 'texto', 'adminId');
    var message = {
      app_id: appKey,
      included_segments: ["All"]
    };

    message.contents = {"en": body.texto};
    message.headings = {"en": body.titulo};
    message.subtitle = {"en": body.subtitulo};

    //message.send_after = body.dataEnvio;
    //SENDING via NODE HTTP CORE

    var sendNotification = function(data) {
      var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic ZTdmOTAyNGYtZmYxNi00OTc3LWI2MjktYjhhM2VmMzJkYzQw"
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
          console.log("Response:");
          console.log(response.statusCode);
          console.log(data);
          db.notificacao.create(body).then(function(notificacao) {
            if(!!notificacao) res.send(data);
            else res.send('Houve um erro');
          }, function (err) {
            res.status(500).send(err);
          }); // fim grava no banco
        });// Fim response data
      }); // fim resquest

      request.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
      });

      request.write(JSON.stringify(data));

      request.end();

    };
    /* FIM FUNCAO ENVIO */

    sendNotification(message);
  };


  return api;
}
