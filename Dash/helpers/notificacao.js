const config = require('../../config/notifications.js');
const https = require('https');

let obj = {};
//General Config
let headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Authorization": "Basic " + config.restApiKey
};

let options = {};
options.host = "onesignal.com";
options.port = 443;
options.headers = headers;

module.exports = () => {
    obj.sendNotification = (data, res) => {
      options.path = "/api/v1/notifications";
      options.method = "POST";
      let req = https.request(options, function(response) {
        response.on('data', function(data) {
          process.stdout.write(data);
        });
      });

      req.on('error', function(e) {
        throw new Error(e);
      });

      req.on('response', function (resp) {
        if((''+resp.statusCode).match(/^2\d\d$/)) res.send("Notificação enviada");
        else res.send("Ocorreu um erro");
      })

      req.write(JSON.stringify(data));
      req.end();
    };

    return obj;
}
