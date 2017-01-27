let api = {};
module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.autenticaLogin = (req, res) => {
    let body = _.pick(req.body, 'email', 'password');
    let adminInstance;
    db.admin.verificar(body).then((admin) => {
      if(!admin) {
        res.status(401).send('Não autorizado');
      } else {
        let token = jwt.sign({data: admin.id }, app.get('secret'), {expiresIn: 60*15});
        res.set('x-access-token', token);
        adminInstance = admin;
        return res.status(200).json(adminInstance.toPublicJSON());
      }
    }).catch((err) => {
        res.status(401).send({Erro : err, Auth:"Não Autorizado"});
    });
  }

  api.verificarToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!!token) {
      jwt.verify(token, app.get('secret'), function(err, decoded) {
          if(err) {
            res.status(401).send({Erro: err, Auth:"Não Autorizado"});
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
