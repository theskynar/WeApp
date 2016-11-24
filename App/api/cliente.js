let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.autenticaCliente = (req, res) => {
    let body = _.pick(req.body, 'email');
	  let clienteInstance;
	db.cliente.verificar(body).then((cliente) => {
			let token = cliente.genToken('authentication');
			clienteInstance = cliente;
			return db.token.create({
				token:token
			});
	}).then((tokenInstance) => {
		res.header('Auth', tokenInstance.get('token')).json(clienteInstance.toPublicJSON());
	}).catch(() => {
			res.status(401).send();
  });
}

  api.autenticaUser = (req, res) => {
    let body = _.pick(req.body, 'email');
  	db.cliente.verificar(body).then((cliente) => {
      		if(!!cliente) return res.status(200).json(cliente);
          res.status(400).send('Oops!');
  	}).catch((err) => {
      res.status(401).send(err);
    });
  }

  api.cadastraUser = (req, res) => {
    let body = _.pick(req.body, 'email', 'nome', 'genero', 'bairroMora', 'bairroTrabalha', 'cel', 'dob');
    db.cliente.create(body).then((cliente) => {
      if(!!cliente) {
        res.status(200).json(cliente);
        io.emit('attgraph');
      }
    }).catch((err) => {
        res.status(400).send('Não foi possível criar o usuário: ' + err);
    });
  }

  api.atualizaUser = (req, res) => {
    let id = parseInt(req.params.id, 10);
    let body = _.pick(req.body, 'email', 'nome', 'genero', 'bairroMora', 'bairroTrabalha', 'cel', 'dob');
    let where = {};

    if(body.hasOwnProperty('email'))  where.email = body.email;
    if(body.hasOwnProperty('nome'))  where.nome = body.nome;
    if(body.hasOwnProperty('genero'))  where.genero = body.genero;
    if(body.hasOwnProperty('bairroMora')) where.bairroMora = body.bairroMora;
    if(body.hasOwnProperty('bairroTrabalha')) where.bairroTrabalha = body.bairroTrabalha;
    if(body.hasOwnProperty('cel'))  where.cel = body.cel;
    if(body.hasOwnProperty('dob'))  where.dob = body.dob;

    db.cliente.findOne({
      where: {
        id: id
      }
    }).then((cliente) =>{
      if(!!cliente) {
        cliente.update(where).then((cliente) => {
            return res.status(200).json(cliente);
        }).catch((err) => {
            res.status(400).send(err);
        });
      } else {
        res.status(404).send();
      }
    }).catch((err) => {
        res.status(500).send(err);
    });
  }

  api.delete = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.cliente.findOne({
      where: {
        id:id
      }
    }).then((clienteDeletado) => {
      if(!!clienteDeletado) {
        return clienteDeletado.destroy(clienteDeletado).then((cliente) => {
            res.status(204).send();
            io.emit('attgraph');
        }).catch((err) => {
            res.status(400).send(err);
        });
      }
      res.status(404).send('Não encontrado');
    }).catch((err) => {
      res.status(500).send(err);
    })
  }

  api.gerarDesconto = (req, res) => {
    let body = _.pick(req.body, 'valor', 'valorTotal', 'isChecked', 'avaliacao', 'clienteId', 'estabelecimentoId');
    db.produto.create(body).then((produto) => {
        req.cliente.addProduto(produto).then(()=> {
          return produto.reload();
        }).then(produto => {
          res.status(200).send('Registro criado')
        });
    }).catch((err) => {
      res.status(400).send('Erro ao criar registro ' + err);
    });
    io.emit('attdesc', body.valorTotal - body.valor);
    io.emit('attgraph');
  }

  return api;

};
