let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

api.autentica = (req, res, next) => {
  let token = req.get('Auth') || '';
  db.token.findOne({
    where: {
      tokenHash:cryptojs.MD5(token).toString()
    }
  }).then((tokenInstance) => {
      if(!tokenInstance) throw new Error();
      req.token = tokenInstance;
      return db.cliente.findByToken(token);
  }).then((cliente) => {
      req.cliente = cliente;
      next();
  }).catch(() => {
      res.status(401).send();
  });
}

  return api;
}
