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
          res.status(401).send('Não Autorizado!');
      });
    }

    api.autenticaCliente = (req, res) => {
      let body = _.pick(req.body, 'email', 'one_signal_id');
      let clienteInstance;
    db.cliente.verificar(body).then((cliente) => {
      if(!!cliente || cliente !== null) {
        let token = cliente.genToken('authentication');
        clienteInstance = cliente;
        return db.token.create({
          token:token
        });
      } else {
        return res.status(404).send('Oops! Este cliente não existe');
      }
    }).then((tokenInstance) => {
      if(clienteInstance.one_signal_id !== body.one_signal_id) {
        return clienteInstance.updateAttributes({
          one_signal_id:body.one_signal_id
        }).then(clienteAtt => {
          return res.header('Auth', tokenInstance.get('token')).send({success: "One signal ID foi atualizado pois era diferente", clienteAtual: clienteAtt})
        }).catch(err => {
          res.status(401).send('Não Autorizado');
        })
      } else {
        if(!!clienteInstance) return res.header('Auth', tokenInstance.get('token')).json({success: "One signal ID não foi atualizado pois não era diferente", cliente: clienteInstance});
      }
    }).catch(() => {
        res.status(401).send('Não Autorizado');
    });
  }

  return api;
}
