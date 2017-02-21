module.exports = (app, io, jwt, cryptojs, db, _, passport, Strategy) => {
    passport.use(new Strategy(
      function(token, cb) {
        db.estabelecimento.findByToken(token, function(err, est){
          if (err) {  return cb(err); }
          if (!est) { return cb(null, false); }
          return cb(null, est, { scope: 'read' });
        });
      }));
    app.use('/v1/api/estabelecimentos/*', passport.authenticate('bearer', { session: false }));
    app.route('/v1/api/estabelecimentos/teste')
      .get(function(req, res) {
        res.send(req.user);
    });


}
