const db = require('../../db.js');
const _ = require('underscore');
const config = require('../../config/notifications.js');
const notificationModule = require('../../Util/notificacao.js')();
const https = require('https');
let api = {};

api.send = (req, res) => {
  let body = _.pick(req.body, 'titulo', 'subtitulo', 'descricao', 'texto', 'date');
  let message = {
    app_id: config.appKey,
    included_segments: ["All"],
    contents: {"en": body.texto},
    heading: {"en": body.titulo},
    subtitle: {"en": body.subtitulo},
    //send_after: {body.date.toTimeString()}
  };
  db.notificacao.create(body).then(notificacao => {
    return req.user.addNotificacao(notificacao).then(response => {
      return notificacao.reload();
    }).then(response => {
      return notificationModule.sendNotification(message, res);
    });
  }).catch(err => {
    return res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  })


};

api.list = (req, res) => {
  db.notificacao.findAll({
    include: [db.admin]
  }).then(notifications => {
    if(!!notifications) return res.status(200).json(notifications);
    res.status(404).send('Nenhuma notifcação encontrada.');
  }).catch(err => {
    res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  })
};



module.exports = api;
