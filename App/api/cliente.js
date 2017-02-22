let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.autenticaUser = (req, res) => {
    let body = _.pick(req.body, 'email', 'one_signal_id');
  	db.cliente.verificar(body).then(cliente => {
      if(cliente.one_signal_id !== body.one_signal_id) {
        return cliente.updateAttributes({
          one_signal_id:body.one_signal_id
        }).then(clienteAtt => {
          return res.status(200).send({success: "One signal ID foi atualizado pois era diferente", clienteAtual: cliente})
        })
      } else {
    		if(!!cliente) return res.status(200).json({success: "One signal ID não foi atualizado pois não era diferente", cliente: cliente});
        return res.status(404).send('Oops! Este cliente não existe');
      }
  	}).catch(err => {
      return res.status(401).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors, Auth: "Não Autorizado"});
    });
  }

  api.clientHasCupom = (req, res) => {
    let param = parseInt(req.params.id, 10);
    let id = param || req.cliente.id;
    db.cliente.findOne({
      where: {
        id: id
      },
      include:[
        {model:db.cupom, where: {clienteId: id}}
      ]
    }).then(cliente => {
          if(!!cliente || cliente != null) return res.status(200).json({cliente: cliente, success: "Contém cupom cadastrado"});
          return res.status(400).send({success: "Não contém cupom cadastrado"});
    }).catch(err => {
      res.status(401).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    });
  }

  api.cadastraCupom = (req, res) => {
    let cliente = req.body.id || req.cliente.id;
    db.cupom.findOne({
      where: {
        cupom: req.body.cupom
      }
    }).then(cupom => {
      if(cupom.clienteId !== null || cupom.clienteId !== '') return res.status(400).send("Este cupom já está sendo utilizado");
      if(!!cupom) {
        return cupom.updateAttributes({
          clienteId: cliente
        }).then(cupomAtt => {
           return res.status(200).send("Cupom atualizado com sucesso, agora você já pode utilizar esse cupom em suas compras");
        }).catch(err => {
          return res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
        })
      } else {
        return res.status(404).send("Cupom não é válido");
      }
    }).catch(err => {
        return res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }


  api.create = (req, res) => {
    let body = _.pick(req.body, 'email', 'nome', 'genero', 'bairroMora', 'bairroTrabalha', 'cel', 'dob', 'one_signal_id');
    db.cliente.create(body).then(cliente => {
      if(!!cliente) {
        return res.status(200).json(cliente);
        io.emit('attgraph');
      }
    }).catch(err => {
        res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
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

  api.listarDescontos = (req, res) => {
    let param = parseInt(req.params.id, 10);
    let id =  param || req.cliente.id;
    db.produto.findAll({
      where: {
        clienteId: id
      },
      include:[
        {model:db.estabelecimento, attributes: ['id', 'url', 'nomeEmpresa', 'descontoAplicado', 'img',
        'latitude', 'longitude', 'segmento', 'endereco',
        'urlFace', 'cidade', 'bairro']},
      ]
    }).then(produtos => {
      if(!!produtos) return res.status(200).json(produtos);
      return res.status(404).send("Não houveram descontos gerados em estabelecimentos credenciados");
    }).catch(err => {
      res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    });
  }

  return api;

};
