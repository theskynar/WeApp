module.exports = (app, io, jwt, cryptojs, db, _, passport) => {
    app.use('/v1/weapp/api/*', passport.authenticate('bearer', { session: false }));

    app.route('/v1/weapp/api/algo')
      .get(function(req, res) {
        res.send(req.user);
      });


}
