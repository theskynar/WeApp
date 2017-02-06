let mysql = require('mysql');
let db  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'tucano44',
  database        : 'weapp',
  multipleStatements: true
});


module.exports = db;
