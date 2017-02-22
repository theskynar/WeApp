const upload = require('../../Util/upload.js')(5000000, 1);
const geocoderConfig = require('../../config/geocoder.js');
const NodeGeocoder = require('node-geocoder');
let geocoder = NodeGeocoder(geocoderConfig);
let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.getById = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.empresa.findById(id).then(empresa => {
      if(!!empresa) {
        let aux = empresa.passwordCrypto;
        aux = cryptojs.AES.decrypt(aux.toString(), "provisorio");
        empresa.passwordCrypto = aux.toString(cryptojs.enc.Utf8);
        return res.status(200).json(empresa);
      }
      res.status(404).json('Nenhuma empresa encontrado!');
    }).catch((err) =>  {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }


  api.list = (req, res) => {
    db.empresa.findAll({
      attributes: {
        exclude: ['passwordHashed', 'passwordCrypto', 'salted']
      }
    }).then((empresa) => {
      let result =[];

      if(!!empresa) {
        empresa.forEach(e => {
              e.passwordCrypto = cryptojs.AES.decrypt(e.passwordCrypto.toString(), "provisorio");
              e.passwordCrypto = e.passwordCrypto.toString(cryptojs.enc.Utf8);
              result.push(e);
        })
        return res.status(200).json(result);
      }
      res.status(404).send('Nenhuma empresa encontrado.');
    }).catch((err) => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })
  }


  api.create = (req, res) => {
    let body = _.pick(req.body, 'CNPJ', 'nomeEmpresa', 'nomeFantasia', 'nomeResponsavel', 'telResponsavel',
      'emailResponsavel', 'emailEmpresa', 'endereco', 'telEmpresa', 'url',
      'dataEntrada', 'vencPlano', 'bairro', 'cidade', 'CEP', 'endereco', 'password',
      'plano', 'levelPlano', 'img');
      let hashing = body.CNPJ + body.nomeEmpresa;
      let hashedCompany = cryptojs.AES.encrypt(hashing, "provisorio");
      let up = upload.uploadFiles("Empresas", hashedCompany, body.nomeEmpresa);
      let rgxPath = /(public\/)/g;
      /*up(req, res, function(err) {
        if(err) {
          return res.status(500).send({Erro: err});
        }
        req.files.images.forEach(p => {
          p['path'] = p['path'].replace(rgxPath, "");
        });
        body.img = p['path'];*/
        geocoder.geocode(body.endereco).then(function(res) {
          res.forEach(data => {
            body.img ="algo";
            body.endereco = data['formattedAddress'];
            body.bairro = data['extra'].neighborhood;
            body.cidade = data['administrativeLevels'].level2long;
            body.CEP = data['zipcode'];
          })
          return body;
        }).then(body => {
          return db.empresa.create(body).then(empresa => {
            return res.status(201).json(empresa.toPublicJSON());
          }).catch(err => {
            res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
          })
        }).catch(function(err) {
          res.status(500).send({Mensagem: "Não foi possível obter dados corretos a partir do endereço passado.", Erro: err});
        });
    //  })
  }

  api.update = (req, res) => {
    let id = parseInt(req.params.id, 10);
    let body = _.pick(req.body, 'CNPJ', 'nomeEmpresa', 'nomeFantasia', 'nomeResponsavel', 'telResponsavel',
      'emailResponsavel', 'emailEmpresa', 'endereco', 'telEmpresa', 'url',
      'dataEntrada', 'vencPlano', 'bairro', 'cidade', 'CEP', 'endereco',
      'plano', 'levelPlano', 'img');
      let hashing = body.CNPJ + body.nomeEmpresa;
      let hashedCompany = cryptojs.AES.encrypt(hashing, "provisorio");
      let up = upload.uploadFiles("Empresas", hashedCompany, body.nomeEmpresa);
      let rgxPath = /(public\/)/g;
      up(req, res, function(err) {
        if(err) {
          return res.status(500).send({Erro: err});
        }
        req.files.images.forEach(p => {
          p['path'] = p['path'].replace(rgxPath, "");
        });
        body.img = p['path'];
        geocoder.geocode(body.endereco).then(function(res) {
          res.forEach(data => {
            body.endereco = data['formattedAddress'];
            body.bairro = data['extra'].neighborhood;
            body.latitude = data['latitude'];
            body.longitude = data['longitude'];
            body.cidade = data['administrativeLevels'].level2long;
            body.CEP = data['zipcode'];
          });
            return body;
          }).then(body => {
            db.empresa.findById(id).then(empresa => {
              if(!!empresa) {
                return empresa.update(body).then((empresa) => {
                    return res.status(200).json(empresa);
                }).catch((err) => {
                    res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
                });
              } else {
                return res.status(404).send("Nenhum empresa encontrado");
              }
            }).catch((err) => {
                res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
            });
          }).catch(err => {
            res.status(500).send({Mensagem: "Não foi possível obter dados corretos a partir do endereço passado.", Erro: err});
          });
      });
  }

  api.generateBearerToken = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.empresa.findById(id).then(empresa => {
      try {
        let token = jwt.sign({data: empresa.id, tipo:'empresa'}, 'secr3t');
        return empresa.updateAttributes({
          token: token
        }).then(empresaAtualizada => {
          return res.status(200).json(empresaAtualizada.toPublicJSON());
        }).catch(err => {
          res.status(400).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
        })
      } catch(e) {
        throw new Error('Erro ao assinar token: ' + e);
      }
    }).catch(err => {
      res.status(500).send({ErroMsg: err.message, ErroNome: err.name, Erro: err.errors});
    })


  }

  return api;
}
