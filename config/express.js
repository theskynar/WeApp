const express = require('express');
const app = express();
const consign =  require('consign');
const bodyParser = require('body-parser');


app.set('secret', 'fuckinGAssHole12345');
app.set("view engine", "ejs");
app.use(express.static('./public'));
app.use(bodyParser.json());

consign({cwd: 'app' })
  .include('api')
  .then('routes/dashboard.js')//CARREGA PRIMEIRO AFIM DE PROIBIR ACESSO;
  .then('routes')
  .into(app);



module.exports = app;
