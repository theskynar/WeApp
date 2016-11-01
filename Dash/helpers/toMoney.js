module.exports = function(array, type){

  var meses = new Array(12);
  array.forEach((item, key) => {
    var month = item.createdAt.getMonth();
    if(meses[month] === undefined) meses[month] = '0';
    meses[month] = parseInt(meses[month]) + item[type];
  });

  return meses;
}
