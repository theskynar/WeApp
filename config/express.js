const express = require('express');
const app = express();
const consign =  require('consign');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('../db.js');
const compression = require('compression');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt =require('jsonwebtoken');
const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;



app.set('secret', 'fuckinGAssHole12345');
app.engine('html', require('ejs').renderFile);
app.set('views', './public');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(compression());
passport.use(new Strategy(
  function(token, cb) {
    db.estabelecimento.findByToken(token, function(err, est){
      if (err) {  return cb(err); }
      if (!est) { return cb(null, false); }
      return cb(null, est, { scope: 'read' });
    });
  }));

app.get("/up", (req, res) => {
  res.render("upload.ejs");
})

consign()
  .include('App/api')
  .then('App/routes/auth.js')
  .then('App/routes')
  .then('Dash/api')
  .then('Dash/routes/auth.js')
  .then('Dash/routes')
  .then('Site/api')
  .then('Site/routes')
  .then('PublicAPI/api')
  .then('PublicAPI/routes/auth.js')
  .then('PublicAPI/routes/evento.js')
  .then('PublicAPI/routes/notification.js')
  .then('PublicAPI/routes/estatistica.js')
  .into(app, io, jwt, cryptojs, db, _, passport);



module.exports = http;
