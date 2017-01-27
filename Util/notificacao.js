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
      return new Promise((resolve, reject) => {
        options.path = "/api/v1/notifications";
        options.method = "POST";
        let req = https.request(options, function(response) {
          response.on('data', function(data) {
            let err = JSON.parse(data);
            if(!!err.errors) return reject(err);
            return resolve(data);
          });
        });
        req.on('error', function(e) {
          throw new Error(e);
        });
        /*req.on('response', function (resp) {
          if((''+resp.statusCode).match(/^2\d\d$/)) return resolve(data);
          else reject();
        })*/
        req.write(JSON.stringify(data));
        req.end();
      })


    };

    return obj;
}
