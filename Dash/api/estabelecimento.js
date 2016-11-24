let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.getById = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.estabelecimento.findOne({
      where: {
        id:id
      }
    }).then((estabelecimento) => {
      if(!!estabelecimento) return res.status(200).json(estabelecimento);
      res.status(404).json('Nenhum estabelecimento encontrado!');
    }).catch((err) =>  {
      res.status(500).send(err);
    })
  }


  api.list = (req, res) => {
    db.estabelecimento.findAll().then((estabelecimento) => {
      if(!!estabelecimento)return res.status(200).json(estabelecimento);
      res.status(404).send('Not found!');
    }).catch((err) => {
      res.status(500).send(err);
    })
  }


  api.create = (req, res) => {
    let body = _.pick(req.body, 'CNPJ', 'Tel', 'img', 'email', 'nomeEmpresa', 'nomeProprietario', 'segmento', 'cidade', 'bairro', 'CEP',
      'descontoAplicado', 'url', 'urlFace', 'dataEntrada', 'vencPlano', 'descontoAplicado', 'localizacao');
     db.estabelecimento.create(body).then((estabelecimento) => {
         return res.status(200).json(estabelecimento);
     }).catch((err) => {
         res.status(400).send(err);
     });
  }

  api.update = (req, res) => {
    let id = parseInt(req.params.id, 10);
    let body = _.pick(req.body, 'CNPJ', 'Tel', 'email', 'img', 'nomeEmpresa', 'nomeProprietario', 'segmento', 'cidade', 'bairro', 'CEP',
      'descontoAplicado', 'url', 'urlFace', 'dataEntrada', 'vencPlano', 'localizacao');
    let where = {};

    if(body.hasOwnProperty('CNPJ'))  where.CNPJ = body.CNPJ;
    if(body.hasOwnProperty('Tel'))  where.Tel = body.Tel;
    if(body.hasOwnProperty('img'))  where.img = body.img;
    if(body.hasOwnProperty('email'))  where.email = body.email;
    if(body.hasOwnProperty('img'))  where.img = body.img;
    if(body.hasOwnProperty('nomeEmpresa'))  where.nomeEmpresa = body.nomeEmpresa;
    if(body.hasOwnProperty('nomeProprietario')) where.nomeProprietario = body.nomeProprietario;
    if(body.hasOwnProperty('segmento'))  where.segmento = body.segmento;
    if(body.hasOwnProperty('cidade'))  where.cidade = body.cidade;
    if(body.hasOwnProperty('bairro'))  where.bairro = body.bairro;
    if(body.hasOwnProperty('CEP'))  where.CEP = body.CEP;
    if(body.hasOwnProperty('descontoAplicado')) where.descontoAplicado = body.descontoAplicado;
    if(body.hasOwnProperty('url')) where.url = body.url;
    if(body.hasOwnProperty('urlFace')) where.urlFace = body.urlFace;
    if(body.hasOwnProperty('dataEntrada')) where.dataEntrada = body.dataEntrada;
    if(body.hasOwnProperty('vencPlano')) where.vencPlano = body.vencPlano;
    if(body.hasOwnProperty('localizacao')) where.localizacao = body.localizacao;

    db.estabelecimento.findOne({
      where: {
        id: id
      }
    }).then((estabelecimento) => {
      if(!!estabelecimento) {
        estabelecimento.update(where).then((estabelecimento) => {
            return res.status(200).json(estabelecimento);
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

  return api;
}
