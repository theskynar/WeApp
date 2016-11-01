const db = require('./../../db.js');
const _ = require('underscore');
const nodemailer = require('nodemailer');

var api = {};

var smtpConfig = "smtps://7aebba0562f0fd4312b40eefbb0df536:39f468a9b789687a74c9ff7a41a031a1@in-v3.mailjet.com"
var transporter = nodemailer.createTransport(smtpConfig);

module.exports = function(app) {

  api.send = function(req, res) {
    var body = _.pick(req.body, 'nome', 'email', 'telefone', 'empresa', 'assunto', 'msg');
    var mailOptions = {
        from: body.nome + ' - ' + body.empresa + ' <breno.agnani@weappm.com.br>', // sender address
        to: 'breno.agnani@weappm.com.br, enricomalvarenga@gmail.com, agnani@weappm.com.br', // list of receivers
        subject: 'Novo Contato - Comerciante ✔', // Subject line
        html: "<div style='width: 600px; background-color: #66BB6A'><h2 style='text-align:center; color:#222; padding:20px 0;'>WeApp - Notificação</h2></div><div style='width: 600px; border-radius: 4px; background-color: #F5F5F5; padding: 20px 0;'><h3 style='font-family: SansSerif, sans-serif; color: #424242; text-transform: uppercase; text-align: center;'>Nova mensagem</h3><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>De</b>: " + body.nome + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>EMAIL:</b> " + body.email + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>EMPRESA:</b> " + body.empresa + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>TELEFONE:</b> " + body.telefone + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>ASSUNTO:</b> " + body.assunto + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-align: center;'><b>MENSAGEM:</b> " + body.msg + "</p></div>" // html body
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
          console.log(err);
          return res.status(500).send('Ocorreu um erro ao enviar o email - ' + err);
        }
        db.contato.create(body).then(function (contato) {
          if(!contato) return res.status(400).send('Não foi possível gravar o contato no banco!');
          res.status(200).send('Obrigado por entrar em contato com a WeApp.\nLogo entraremos em contato para esclarecer sua dúvidas...');
        }, function (err) {
            res.status(500).send('Erro => ' + err);
        });
    });
  }

  return api;
}
