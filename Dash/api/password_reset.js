const nodemailer = require('nodemailer');
const config = require('../../config/email.js');
const transporter = nodemailer.createTransport(config.smtpConfig);
let api = {};
let advice = "Para resetar sua senha, entre no link fornecido abaixo.<br> Lembre-se que você terá 15 minutos para acessar o mesmo,<br> caso contrário terá que gerar outro link através de 'Esqueci minha senha'";
let link = "http://weappm.com.br/admin/password_reset/";
module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.reset = (req, res) => {
    let body = _.pick(req.body, 'email');
    let mailOptions = {
        from: 'WeApp Management - <breno.agnani@gmail.com>', // sender address
        to: 'agnani@weappm.com.br, mabordin98@gmail.com, mbordin@atma-it.com,'+body.email, // list of receivers
        subject: 'Resetar Senha - WeApp Manager ✔', // Subject line
        html: ""
    };
    db.admin.findOne({
      where: {
        email:body.email
        //$and: [{email:body.email.toLowerCase()}, {dob:body.dob}]
      }
    })
    .then(admin => {
        if(!!admin) {
          let token = admin.generateToken('reset');
          admin.resetTokenHashed(token);
          mailOptions.html = "<div style='width: 600px; background-color: #66BB6A'><h2 style='text-align:center; color:#222; padding:20px 0;'>WeApp - Resetar Senha</h2></div><div style='width: 600px; border-radius: 4px; background-color: #F5F5F5; padding: 20px 15px;'><h3 style='font-family: SansSerif, sans-serif; color: #424242; text-transform: uppercase; text-align: center;'>Vamos resetar sua senha?</h3><p style='font-family: SansSerif, sans-serif; color: #222; text-align: left;'><b></b>  " + advice + "</p><p style='font-family: SansSerif, sans-serif; color: #222; text-align: left;'><b>Link:</b> " + link + admin.tokenReset + "</p>"
          console.log(JSON.stringify(admin));
          transporter.sendMail(mailOptions, function(err, info) {
            if(err) return res.status(500).send('Erro ao enviar email de recuperação de senha => ' + err);
            return res.status(200).send('Um email com instruções de recuperação de senha foi enviado. Cheque sua caixa de entrada, Muito Obrigado. Caso tenha enfrentado problemas, contate-nos: +55(11)940289846');
          });
        } else {
          console.log(JSON.stringify(admin));
          return res.status(404).send('Usuário não encontrado, verifique as informações digitadas');
        }
    }).catch(err => {
      return res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }

  api.resetPage = (req, res) => {
    let token = req.params.token;
    db.admin.findByToken(token).then((admin) => {
      if(!!admin.passwordTokenExpired()) {
        return res.status(404).send('Link expirado, tempo máximo excedido.');
      }
      return res.status(200).json(admin.toPublicJSON());
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }

  api.changePassword = (req, res) => {
    let token = req.params.token;
    let body = _.pick(req.body, 'email', 'password');
    db.admin.findByToken(token).then((admin) => {
      if(!admin.passwordTokenExpired()) {
         return admin.updateAttributes({
           password: body.password
         })
         .then((admin) => {
           if(!!admin) return res.status(200).send(admin.toPublicJSON());
         }).catch((err) => {
            return res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
         })
      } else {
            return res.status(404).send('Link expirado, tempo máximo excedido.');
      }
    }).catch((err) => {
          res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    });
  }


  return api;
}
