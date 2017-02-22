const db = require('../../config/db.js');
const _ = require('underscore');
const config = require('../../config/notifications.js');
const notificationModule = require('../../Util/notificacao.js')();
const https = require('https');
let api = {};

api.sendAll = (req, res) => {
  let body = _.pick(req.body, 'titulo', 'subtitulo', 'descricao', 'texto',
  'agendar_data', 'enviar_hora', 'estabelecimentoId');
  body.estabelecimentoId = req.user.id;
  let message = {
    app_id: config.appKey,
    included_segments: ["All"],
    contents: {"en": body.texto},
    heading: {"en": body.titulo},
    subtitle: {"en": body.subtitulo},
    send_after: body.agendar_data,
    delayed_option: "timezone",
    delivery_time_of_day: body.enviar_hora
  };

  notificationModule.sendNotification(message, res).then(data => {
    if(!!data) {
      db.notificacao.create(body).then(notificacao => {
          if(!!notificacao) {
            return res.status(200).send({Mensagem: "Notificação enviada com sucesso!", Data: JSON.parse(data), Notificacao: notificacao.toJSON()});
          }
      }).catch(err => {
        return res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
      })
    }
  }).catch(err => {
    res.status(400).send({Erro: err.errors});
  })
};

api.sendByLocation = (req, res) => {
  let body = _.pick(req.body, 'titulo', 'subtitulo', 'descricao', 'texto',
  'agendar_data', 'enviar_hora', 'bairros', 'estabelecimentoId');
  body.estabelecimentoId = req.user.id;
  if(!Array.isArray(body.bairros) || _.isEmpty(body.bairros))
    return res.status(400).send("Lista de bairros deve ser um array.");

  let query = `select * from cliente
  where bairroMora in ${body.bairros} or bairroTrabalha in ${body.bairros}`;

  let message = {
    app_id: config.appKey,
    included_segments: ["All"],
    contents: {"en": body.texto},
    heading: {"en": body.titulo},
    subtitle: {"en": body.subtitulo},
    send_after: body.agendar_data,
    delayed_option: "timezone",
    delivery_time_of_day: body.enviar_hora
  };

  db.sequelize.query(query).then(clientes => {
      let sendTo = [];
      cliente.forEach(cli => {
        sendTo.push(cliente['one_signal_id']);
      });
      message.include_player_ids = sendTo;
      notificationModule.sendNotification(message, res).then(data => {
        if(!!data) {
          db.notificacao.create(body).then(notificacao => {
              return res.status(200).send({Mensagem: "Notificação enviada com sucesso!", Data: JSON.parse(data), Notificacao: notificacao.toJSON()});
          }).catch(err => {
            return res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
          })
        }
      }).catch(err => {
        res.status(400).send({Erro: err.errors});
      });
  });
};

api.list = (req, res) => {
  db.notificacao.findAll({
      where: {
        estabelecimentoId: req.user.id
      }
    }).then(notifications => {
    if(!!notifications) return res.status(200).json(notifications);
    res.status(404).send('Nenhuma notifcação encontrada.');
  }).catch(err => {
    res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
  })
};



module.exports = api;
