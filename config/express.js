const express = require('express');
const app = express();
const consign =  require('consign');
const bodyParser = require('body-parser');

app.set('secret', 'fuckinGAssHole12345');

app.engine('html', require('ejs').renderFile);
app.set('views', './public');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log("## Carregando arquivos ##");
consign()
  .include('App/api')
  .then('App/routes')//CARREGA PRIMEIRO AFIM DE PROIBIR ACESSO;
  .then('Dash/api')
  .then('Dash/routes/auth.js')
  .then('Dash/routes')
  .then('Site/api')
  .then('Site/routes')
  .into(app);



console.log("## Todos os arquivos foram carregados ##");


module.exports = app;
