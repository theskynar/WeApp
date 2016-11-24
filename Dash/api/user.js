let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {

  api.createUser = (req, res) => {
    let body = _.pick(req.body,  'name', 'email', 'img', 'password');
     db.admin.create(body).then((admin) => {
         res.status(200).json(admin.toPublicJSON());
     }).catch((err) => {
         res.status(400).json(e);
     });
  }

  api.update = (req, res) => {
    let id = parseInt(req.params.id, 10);
    let body = _.pick(req.body, 'name', 'email', 'img');
    let where = {};
    let adminInstance;

    if(body.hasOwnProperty('name')) where.name = body.name;
    if(body.hasOwnProperty('email')) where.email = body.email;
    if(body.hasOwnProperty('img')) where.img= body.img;

    db.admin.findOne({
      where: {
        id: id
      }
    }).then((admin) => {
      if(!!admin) {
        admin.update(where).then((admin) => {
            res.status(200).json(admin.toPublicJSON());
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


  api.list = (req, res) => {
    db.admin.findAll({attributes: ['id', 'name', 'email', 'img', 'createdAt', 'updatedAt']}).then((admins) => {
      if(!!admins) return res.status(200).json(admins);
        res.status(404).send('Not found');
    }).catch((err) => {
        res.status(500).send(e);
    });
  }

  api.getUserById = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.admin.findOne({
      where: {
        id: id
      },
      attributes: {
        exclude: ['passwordHashed', 'salted']
      }
    }).then((admin) => {
        if(!!admin) return res.status(200).json(admin);
        res.status(404).send('Not Found')
    }).catch((err) => {
        res.status(500).send(err);
    })
  }

  api.delete = (req, res) => {
    let id = parseInt(req.params.id, 10);
    db.admin.findOne({
      where: {
        id:id
      }
    }).then((admin) => {
      if(!!admin) {
        return admin.destroy(admin).then((adminDeletado) => {
          res.status(204).send();
        }).catch(function (err) {
          res.status(400).send(err);
        });
      }
      res.status(404).send('Admin não encontrado');
    }).catch(function (err) {
      res.status(500).send(err);
    });
  }

  return api;
}
