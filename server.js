const app = require('./config/express.js');
const db = require('./db.js');
const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(function() { // force true is set when u wanna zero out the db.
 app.listen(PORT, function() {
        console.log('The server is up on port ' + PORT);
  });
});
