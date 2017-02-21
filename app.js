const http = require('./config/express.js');
const db = require('./config/db.js');
const PORT = process.env.PORT || 4002;


db.sequelize.sync().then(() => {
  http.listen(PORT, function() {
      console.log('The server is up on port ' + PORT);
  });
});
