module.exports = function(app) {
  var funcs = {};
  var api = require('./stats_v2.js');
  funcs.getPromises = (req, res) => {

    var types = req.params.type.split('+');
    var funcs = [];
    types.forEach(function(elem, index){
      funcs.push(api[elem]());
    });

    Promise.all(funcs)
      .then(function(data){

        var result = {};
        types.forEach(function(elem, index){
          result[elem] = data[index];
        });
        res.json(result);

      })
      .catch(function(err){
        res.send(err);
      });
  }

  return funcs;
}
