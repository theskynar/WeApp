const nodemailer = require('nodemailer');
const config = require('../../config/email.js');
const transporter = nodemailer.createTransport(config.smtpConfig);

var api = {};



module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.send = (req, res) => {
    var body = _.pick(req.body, 'nome', 'email', 'telefone', 'empresa', 'assunto', 'msg');
    var mailOptions = {
        from: body.nome + ' - ' + body.empresa + ' <breno.agnani@gmail.com>', // sender address
        to: 'mabordin@gmail.com, enricomalvarenga@gmail.com, agnani@weappm.com.br, thiego_silva@hotmail.com, claudioemboava@hotmail.com, breno_agnani@hotmail.com, thiego_campos@weappm.com.br, claudio@weappm.com.br', // list of receivers
        subject: 'Novo Contato - Comerciante ✔', // Subject line
        html: "<div style='width: 600px; background-color: #66BB6A'><h2 style='text-align:center; color:#222; padding:20px 0;'>WeApp - Notificação</h2></div><div style='width: 600px; border-radius: 4px; background-color: #F5F5F5; padding: 20px 0;'><h3 style='font-family: SansSerif, sans-serif; color: #424242; text-transform: uppercase; text-align: center;'>Nova mensagem</h3><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>De</b>: " + body.nome + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>EMAIL:</b> " + body.email + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>EMPRESA:</b> " + body.empresa + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>TELEFONE:</b> " + body.telefone + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-transform: uppercase; text-align: center;'><b>ASSUNTO:</b> " + body.assunto + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-align: center;'><b>MENSAGEM:</b> " + body.msg + "</p></div>"
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if(err) {
          return res.status(500).send('Ocorreu um erro ao enviar o email - ' + err);
        }
        io.emit('newemail', 'Você recebeu uma nova mensagem de <strong>' + body.nome + '.</strong> <br>Visualize sua caixa de E-mail;');
        db.contato.create(body).then((contato) => {
          if(!contato) return res.status(400).send('Não foi possível gravar o contato no banco!');
          res.status(200).send('Obrigado por entrar em contato com a WeApp.\nLogo entraremos em contato para esclarecer sua dúvidas...');
        }).catch((err) => {
            res.status(500).send('Erro => ' + err);
        });
    });
  }

  return api;
}
