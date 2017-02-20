const Sequelize = require('sequelize');
let env = process.env.NODE_ENV || 'development';

let sequelize;

/*sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
  dialect: 'sqlite',
  storage: __dirname + '/../data/weapp_2.sqlite',
  define: {
    freezeTableName: true
  }
});*/

sequelize = new Sequelize('weapp', 'root', 'tucano44', {
  dialect: 'mysql',
  //storage: __dirname + '/../data/weapp_2.sqlite',
  define: {
    freezeTableName: true
  },
  pool: {
    maxConnections: 5
  }
});

let db = {};

db.admin = sequelize.import(__dirname + '/../model/admin.js');
db.cliente = sequelize.import(__dirname + '/../model/cliente.js');
db.estabelecimento = sequelize.import(__dirname + '/../model/estabelecimento.js');
db.produto = sequelize.import(__dirname + '/../model/produto.js');
db.notificacao = sequelize.import(__dirname + '/../model/notificacao.js');
db.evento = sequelize.import(__dirname + '/../model/evento.js');
db.contato = sequelize.import(__dirname + '/../model/contato.js');
db.premio = sequelize.import(__dirname + '/../model/premio.js');
db.token = sequelize.import(__dirname + '/../model/token.js');
db.empresa = sequelize.import(__dirname + '/../model/empresa.js');
db.funcionario = sequelize.import(__dirname + '/../model/funcionario.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.cliente.hasMany(db.produto);
db.produto.belongsTo(db.cliente);

db.estabelecimento.hasMany(db.produto);
db.produto.belongsTo(db.estabelecimento);

db.produto.hasMany(db.premio);
db.premio.belongsTo(db.produto);

db.admin.hasMany(db.notificacao);
db.notificacao.belongsTo(db.admin);

db.estabelecimento.hasMany(db.notificacao);
db.notificacao.belongsTo(db.estabelecimento);

db.estabelecimento.hasMany(db.evento);
db.evento.belongsTo(db.estabelecimento);

db.empresa.hasMany(db.funcionario);
db.funcionario.belongsTo(db.empresa);


module.exports = db;
