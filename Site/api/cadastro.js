let api = {};

module.exports = (app, io, jwt, cryptojs, db, _) => {
  api.generateLink = (req, res) => {
    let adminId = req.params.adminId;
    db.admin.findOne({
      where: {
        id:adminId
      },
      attributes: {
        exclude: ['password','createdAt', 'updatedAt', 'salted', 'passwordHashed', 'img']
      }
    })
    .then((admin) => {
      if(admin) return res.status(200).json(admin);
      return res.status(404).send('Página não encontrada');
    })
    .catch((err) => {
      return res.status(500).send("Ocorreu um erro " + err);
    })
  }

  return api;
}
