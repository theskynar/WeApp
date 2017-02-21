module.exports = app => {
    app.get("/", (req, res) => {
       res.render("public/parceiros/index.html")
    });
}