const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

sequelize = new Sequelize('weapp', 'ealvarenga', 'Weapp44!', {
    dialect: 'mysql',
    host: '159.203.37.82',
    port: 3306
});

var db = {};

db.admin = sequelize.import(__dirname + '/model/admin.js');
db.cliente = sequelize.import(__dirname + '/model/cliente.js');
db.estabelecimento = sequelize.import(__dirname + '/model/estabelecimento.js');
db.produto = sequelize.import(__dirname + '/model/produto.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.cliente.hasMany(db.produto);
db.estabelecimento.hasMany(db.produto);


module.exports = db;
