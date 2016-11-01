module.exports = function(array){

  var meses = new Array(12);
  array.forEach((item, key) => {
    var month = item.createdAt.getMonth();
    if(meses[month] === undefined) meses[month] = '0';
    meses[month] = parseInt(meses[month]) + 1;
  });

  return meses;
}
