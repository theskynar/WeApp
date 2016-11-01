const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

sequelize = new Sequelize('weapp', 'ealvarenga', 'Weapp44!', {
    dialect: 'mysql',
    host: '159.203.37.82',
    port: 3306
});

/**sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
  dialect: 'sqlite',
  storage: __dirname + '/data/mcc-sqlite.sqlite'
});*/

var db = {};

db.admin = sequelize.import(__dirname + '/model/admin.js');
db.cliente = sequelize.import(__dirname + '/model/cliente.js');
db.estabelecimento = sequelize.import(__dirname + '/model/estabelecimento.js');
db.produto = sequelize.import(__dirname + '/model/produto.js');
db.notificacao = sequelize.import(__dirname + '/model/notificacao.js');
db.evento = sequelize.import(__dirname + '/model/evento.js');
db.contato = sequelize.import(__dirname + '/model/contato.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.cliente.hasMany(db.produto);
db.produto.belongsTo(db.cliente);

db.estabelecimento.hasMany(db.produto);
db.produto.belongsTo(db.estabelecimento);

db.admin.hasMany(db.notificacao);
db.notificacao.belongsTo(db.admin);

db.estabelecimento.hasMany(db.evento);
db.evento.belongsTo(db.estabelecimento);

//db.estabelecimento.hasMany(db.notificacao);
//db.estabelecimento.hasMany(db.evento);

module.exports = db;
