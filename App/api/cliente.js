let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.autenticaUser = (req, res) => {
    let body = _.pick(req.body, 'email');
  	db.cliente.verificar(body).then(cliente => {
      		if(!!cliente) return res.status(200).json(cliente);
          res.status(400).send('Oops!');
  	}).catch(err => {
      res.status(401).send(err);
    });
  }

  api.create = (req, res) => {
    let body = _.pick(req.body, 'email', 'nome', 'genero', 'bairroMora', 'bairroTrabalha', 'cel', 'dob');
    db.cliente.create(body).then(cliente => {
      if(!!cliente) {
        return res.status(200).json(cliente);
        io.emit('attgraph');
      }
    }).catch(err => {
        res.status(400).send('Não foi possível criar o usuário: ' + err);
    });
  }

  api.update = (req, res) => {
    let id = parseInt(req.params.id, 10);
    let body = _.pick(req.body, 'email', 'nome', 'genero', 'bairroMora', 'bairroTrabalha', 'cel', 'dob');
    db.cliente.findById(id).then(cliente => {
      if(!!cliente) {
        return cliente.update(body).then(cliente => {
            return res.status(200).json(cliente);
        }).catch(err => {
            res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
        });
      } else {
        res.status(404).send("Cliente não encontrado");
      }
    }).catch(err => {
        res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    });
  }

  api.delete = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.cliente.findById(id).then(clienteDeletado => {
      if(!!clienteDeletado) {
        return clienteDeletado.destroy(clienteDeletado).then(cliente => {
            res.status(204).send();
            io.emit('attgraph');
        }).catch(err => {
            res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
        });
      }
      res.status(404).send('Não encontrado');
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }

  api.gerarDesconto = (req, res) => {
    let body = _.pick(req.body, 'valor', 'valorTotal', 'isChecked', 'avaliacao', 'clienteId', 'estabelecimentoId');
    db.produto.create(body).then(produto => {
        req.cliente.addProduto(produto).then(()=> {
          return produto.reload();
        }).then(produto => {
          res.status(200).send('Registro criado');
        });
    }).catch(err => {
      res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    });
    io.emit('attdesc', body.valorTotal - body.valor);
    io.emit('attgraph');
  }

  return api;

};
