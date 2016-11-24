module.exports = function(app) {
  let funcs = {};
  let api = require('./estatistica_async.js');
  funcs.getPromises = (req, res) => {

    let types = req.params.type.split('+');
    let funcs = [];
    types.forEach(function(elem, index){
      funcs.push(api[elem]());
    });

    Promise.all(funcs)
      .then(function(data){

        let result = {};
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
