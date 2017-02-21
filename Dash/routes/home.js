module.exports = function(app) {

    app.get('/manager', function(req, res) {
        res.render('manager/index.html');
    });

    app.get('/parceiros', function(req, res) {
        res.render('parceiros/index.html');
    });

}