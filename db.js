const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
    "dialect": 'sqlite',
    "storage": __dirname + '/data/dbxxx.sqlite'
});

var db = {};

db.admin = sequelize.import(__dirname + '/model/admin.js');
db.cliente = sequelize.import(__dirname + '/model/cliente.js');
db.estabelecimento = sequelize.import(__dirname + '/model/estabelecimento.js');
db.produto = sequelize.import(__dirname + '/model/produto.js');
db.notificacao = sequelize.import(__dirname + '/model/notificacao.js');
db.evento = sequelize.import(__dirname + '/model/evento.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.cliente.hasMany(db.produto);
db.estabelecimento.hasMany(db.produto);

db.admin.hasMany(db.notificacao);
db.estabelecimento.hasMany(db.evento);

//db.estabelecimento.hasMany(db.notificacao);
//db.estabelecimento.hasMany(db.evento);

module.exports = db;
