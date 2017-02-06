const express = require('express');
const app = express();
const consign =  require('consign');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const db = require('./db.js');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt =require('jsonwebtoken');

app.set('secret', 'fuckinGAssHole12345');
app.engine('html', require('ejs').renderFile);
app.set('views', './public');
app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(bodyParser.json());



consign()
  .include('App/api')
  .then('App/routes/authorize.js')
  .then('App/routes')
  .then('Util/levels.js')
  .into(app, db, _);




module.exports = http;
