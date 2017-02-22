let accountSid = 'ACd0aa180a01a8b3c4f00206c1b6414a7e';
let authToken = '10caa319c4c49dccc6a99f796905cc44';
//let authToken = '3fd07efec711dbb7b218dd0f4568cde6';

let api = {};

//require the Twilio module and create a REST client
let client = require('twilio')(accountSid, authToken);





module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.sendFriends = (req, res) => {
    let friendsInvited = [];

    //friendsInvited.forEach(friend => {

      client.messages.create({
          to: "+5511940289846",
          from: "+15005550006",
          body: "Olá, faça o download do aplicativo WeApp e obtenha descontos em diversos estabelecimentos.",
      }, function(err, message) {
          if(err) return res.status(500).send({Erro: err});
          return res.status(200).send({message: message});
      });

    //})
  }

  return api;

};
