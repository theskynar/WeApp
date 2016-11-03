
var funcs = {};

module.exports = function(app) {
  funcs.getPromises = (req, res) => {
    api = app.Dash.api.stats_v2;
    var urlDelimiter = req.params.type.split('+');
    console.log(urlDelimiter);
    var functions = [];
      urlDelimiter.forEach((elem, i) => {
        functions.push(api[elem]);
      });
      Promise.all(functions)
      .then(data => {
         var result = {};
         urlDelimiter.forEach((elem, i) => {
           result[elem] = data[i];
         });
         res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

  return funcs;
}
