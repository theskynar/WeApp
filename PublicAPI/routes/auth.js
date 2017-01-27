module.exports = (app, io, jwt, cryptojs, db, _, passport) => {
    app.use('/v1/*', passport.authenticate('bearer', { session: false }));

    app.route('/v1/notificacao')
      .get(function(req, res) {
        res.send(req.user);
      });


}
