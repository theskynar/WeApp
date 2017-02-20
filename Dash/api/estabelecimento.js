const upload = require('../../Util/upload.js')(5000000, 1);
const geocoderConfig = require('../../config/geocoder.js');
const NodeGeocoder = require('node-geocoder');
let geocoder = NodeGeocoder(geocoderConfig);
let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {
    api.getById = (req, res) => {
        let id = parseInt(req.params.id, 10);
        db.estabelecimento.findById(id).then((estabelecimento) => {
            if (!!estabelecimento) return res.status(200).json(estabelecimento);
            res.status(404).json('Nenhum estabelecimento encontrado!');
        }).catch((err) => {
            res.status(500).send({ ErroMsg: err.message, ErroNome: err.name, Erro: err.errors });
        })
    }


    api.list = (req, res) => {
        db.estabelecimento.findAll().then((estabelecimento) => {
            if (!!estabelecimento) return res.status(200).json(estabelecimento);
            res.status(404).send('Nenhum estabelecimento encontrado.');
        }).catch((err) => {
            res.status(500).send({ ErroMsg: err.message, ErroNome: err.name, Erro: err.errors });
        })
    }


    api.create = (req, res) => {
        let body = _.pick(req.body, 'CNPJ', 'Tel', 'img', 'email', 'nomeEmpresa', 'nomeProprietario', 'segmento', 'endereco',
            'descontoAplicado', 'url', 'urlFace', 'dataEntrada', 'vencPlano',
            'bairro', 'cidade', 'CEP', 'endereco', 'latitude',
            'longitude', 'password');
        let hashing = body.CNPJ + body.nomeEmpresa;
        let hashedCompany = cryptojs.AES.encrypt(hashing, "provisorio");
        let up = upload.uploadFiles("Estabelecimentos", hashedCompany, body.nomeEmpresa);
        let rgxPath = /(public\/)/g;
        /*up(req, res, function(err) {
          if(err) {
            return res.status(500).send({Erro: err});
          }
          req.files.images.forEach(p => {
            p['path'] = p['path'].replace(rgxPath, "");
          });*/
        geocoder.geocode(body.CEP).then(function(res) {
            //body.img = p['path'];
            res.forEach(data => {
                body.img = req.body.img;
                body.endereco = data['formattedAddress'];
                body.bairro = data['extra'].neighborhood;
                body.latitude = data['latitude'];
                body.longitude = data['longitude'];
                body.cidade = data['administrativeLevels'].level2long;
                body.CEP = data['zipcode'];
            })
            return body;
        }).then(body => {
            return db.estabelecimento.create(body)
                .then(estabelecimento => {
                    return res.status(201).json(estabelecimento.toPublicJSON());
                }).catch(err => {
                    console.log(err);
                    return res.status(400).send({ ErroMsg: err.message, ErroNome: err.name, Erro: err.errors });
                })
        }).catch(err => {
            console.log(err);
            res.status(500).send({ Mensagem: "Não foi possível obter dados corretos a partir do endereço passado.", Erro: err });
        });
        /*})*/
    }

    api.update = (req, res) => {
        let id = parseInt(req.params.id, 10);
        let body = _.pick(req.body, 'CNPJ', 'Tel', 'img', 'email', 'nomeEmpresa', 'nomeProprietario', 'segmento', 'endereco',
            'descontoAplicado', 'url', 'urlFace', 'dataEntrada', 'vencPlano', 'bairro', 'cidade', 'CEP',
            'endereco', 'latitude', 'longitude');
        let hashing = body.CNPJ + body.nomeEmpresa;
        let hashedCompany = cryptojs.AES.encrypt(hashing, "provisorio");
        let up = upload.uploadFiles("Estabelecimentos", hashedCompany, body.nomeEmpresa);
        let rgxPath = /(public\/)/g;
        up(req, res, function(err) {
            if (err) {
                return res.status(500).send({ Erro: err });
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
                db.estabelecimento.findById(id).then(estabelecimento => {
                    if (!!estabelecimento) {
                        return estabelecimento.update(body).then((estabelecimento) => {
                            return res.status(200).json(estabelecimento);
                        }).catch((err) => {
                            res.status(400).send({ ErroMsg: err.message, ErroNome: err.name, Erro: err.errors });
                        });
                    } else {
                        return res.status(404).send("Nenhum estabelecimento encontrado");
                    }
                }).catch((err) => {
                    res.status(500).send({ ErroMsg: err.message, ErroNome: err.name, Erro: err.errors });
                });
            }).catch(err => {
                res.status(500).send({ Mensagem: "Não foi possível obter dados corretos a partir do endereço passado.", Erro: err });
            });
        });
    }

    api.generateBearerToken = (req, res) => {
        let id = parseInt(req.params.id, 10);
        db.estabelecimento.findById(id).then(estabelecimento => {
            try {
                let token = jwt.sign({ data: estabelecimento.id, tipo: 'estabelecimento' }, 'secr3t');
                return estabelecimento.updateAttributes({
                    token: token
                }).then(estabAtualizado => {
                    return res.status(200).json(estabAtualizado.toPublicJSON());
                }).catch(err => {
                    res.status(400).send({ ErroMsg: err.message, ErroNome: err.name, Erro: err.errors });
                })
            } catch (e) {
                throw new Error('Erro ao assinar token: ' + e);
            }
        }).catch(err => {
            res.status(500).send({ ErroMsg: err.message, ErroNome: err.name, Erro: err.errors });
        })


    }

    return api;
}