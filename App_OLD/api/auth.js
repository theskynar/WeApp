const db = require('../../../config/db.js');
const jwt = require('jsonwebtoken');
let api = {};

api.autenticaAdminEstabelecimento = (req, res) => {
  let body = _.pick(req.body, 'email', 'password');
  let userInstance;
  db.userEstabelecimento.verificar(body, req.user.id).then((userEstabelecimento) => {
    if(!userEstabelecimento) {
      res.status(401).send('Não autorizado');
    } else {
      let token = jwt.sign({data: userEstabelecimento.id }, app.get('secret'), {expiresIn: 60*30});
      res.set('x-access-token', token);
      userInstance = userEstabelecimento;
      return res.status(200).json(userInstance.toPublicJSON());
    }
  }).catch((err) => {
      res.status(401).send({Erro : err, Auth:"Não Autorizado"});
  });
}

api.verificarTokenAdmin = (req, res, next) => {
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
