module.exports = (app) => {
    let api = app.API.Empresas.api.funcionario;
    app.route('/v1/empresas/funcionarios')
        .get(api.list);
    //.post(api.bulkCreate);

    app.route('/v1/empresas/funcionario/:id?')
        .get(api.listById)
        .post(api.create)
        .put(api.update)
        .delete(api.delete);
}