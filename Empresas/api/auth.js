var api = {};
module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.autenticaLogin = (req, res) => {
    var body = _.pick(req.body, 'email', 'password');
    var adminInstance;
    db.admin.verificar(body).then((admin) => {
      if(!admin) {
        console.log('Não Autorizado!');
      } else {
        var token = jwt.sign(admin , app.get('secret'));
        res.set('x-access-token', token);
        adminInstance = admin;
        res.json(adminInstance.toPublicJSON());
      }
    }).catch((err) => {
        res.status(401).send('Não autorizado!');
    });
  }

  api.verificarToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if(!!token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
          if(err) {
            res.status(401);
          }
          req.admin = decoded;
          next();
      });
    } else {
      res.status(401).send('Não Autorizado');
    }
  }
  return api;
};
