const config = require('../../config/notifications.js');
const notificationModule = require('../helpers/notificacao.js')();
const https = require('https');
let api = {};
module.exports = (app, io, jwt, cryptojs, db, _) => {
  api.send = (req, res) => {
    let emails = [];
    let body = _.pick(req.body, 'titulo', 'subtitulo', 'descricao', 'texto', 'adminId');
    let message = {
      app_id: config.appKey,
      included_segments: ["All"],
      contents: {"en": body.texto},
      heading: {"en": body.titulo},
      subtitle: {"en": body.subtitulo},
    };
    db.notificacao.create(body).then(notificacao => {
      return notificationModule.sendNotification(message, res);
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


  return api;
}
