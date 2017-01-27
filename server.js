const http = require('./config/express.js');
const db = require('./config/db.js');
const PORT = process.env.PORT || 8080;
const exec = require('child_process').exec

db.sequelize.sync().then(function() {
 http.listen(PORT, function() {
        console.log('The server is up on port ' + PORT);
        exec('start chrome http://localhost:8080')
  });
});
