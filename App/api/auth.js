const db = require('../../config/db.js');
const jwt = require('jsonwebtoken');
let api = {};

api.autentica = (req, res) => {
  let body = _.pick(req.body, 'email', 'password');
  db.estabelecimento.verificar(body).then((estabelecimento) => {
    if(!estabelecimento) {
      db.empresa.verificar(body).then(empresa => {
        if(!empresa) return res.status(401).send("Não autorizado");
        try {
          let token = jwt.sign({id: empresa.id, tipo: 'empresa'}, 'segredo', {expiresIn: 60*40});
          res.set('x-access-token', token);
          return res.status(200).json(empresa);
        } catch(e) {
          return res.status(400).send({Erro: e.toString()});
        }
      }).catch(err => {
        return res.status(401).send({Erro : err, Auth:"Não Autorizado"});
      })
    } else {
      try {
        let token = jwt.sign({id: estabelecimento.id, tipo: 'estabelecimento'}, 'segredo', {expiresIn: 60*40});
        res.set('x-access-token', token);
        return res.status(200).json(estabelecimento);
      } catch(e) {
        return res.status(400).send({Erro: e.toString()});
      }
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
        req.user = decoded;
        next();
    });
  } else {
    res.status(401).send('Não Autorizado');
  }
}

api.verificarTokenEstab = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if(!!token) {
    jwt.verify(token, app.get('secret'), function(err, decoded) {
        if(err) {
          res.status(401).send({Erro: err, Auth:"Não Autorizado"});
        }
        if(decoded.data.tipo === 'estabelecimento') {
          req.user = decoded;
          next()
        }
        return res.status(401).send("Você não é autorizado a visualizar esse conteúdo.");
    });
  } else {
    res.status(401).send('Não Autorizado');
  }
}

api.verificarTokenEmpresa = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if(!!token) {
    jwt.verify(token, app.get('secret'), function(err, decoded) {
        if(err) {
          res.status(401).send({Erro: err, Auth:"Não Autorizado"});
        }
        if(decoded.data.tipo === 'empresa') {
          req.user = decoded;
          next()
        }
        return res.status(401).send("Você não é autorizado a visualizar esse conteúdo.");
    });
  } else {
    res.status(401).send('Não Autorizado');
  }
}

module.exports = api;
