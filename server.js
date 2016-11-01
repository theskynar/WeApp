const http = require('./config/express.js');
const db = require('./db.js');
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function() {
 http.listen(PORT, function() {
        console.log('The server is up on port ' + PORT);
  });
});
