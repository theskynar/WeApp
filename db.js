const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

if(env == 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  })
} else {
  sequelize = new Sequelize('undefined', 'undefined', 'undefined', {
    dialect: 'sqlite',
    storage: __dirname + '/data/mcc-sqlite.sqlite'
  });
}

var db = {};

db.admin = sequelize.import(__dirname + '/model/admin.js');
db.cliente = sequelize.import(__dirname + '/model/cliente.js');
db.historicoCliente = sequelize.import(__dirname + '/model/historicoCliente.js');
db.estabelecimento = sequelize.import(__dirname + '/model/estabelecimento.js');
db.produto = sequelize.import(__dirname + '/model/produto.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.cliente.hasOne(db.historicoCliente);
db.historicoCliente.belongsTo(db.cliente);

db.cliente.hasMany(db.produto);
db.produto.belongsTo(db.cliente);

db.produto.hasMany(db.historicoCliente);
db.produto.belongsTo(db.estabelecimento);



module.exports = db;
