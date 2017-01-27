module.exports = function(array){

  let meses = new Array(13);
  array.forEach((item, key, array) => {
    let month = item.createdAt.getMonth();
    if(meses[month] === undefined) meses[month] = '0';
    meses[month] = parseInt(meses[month]) + 1;
  });
  for(let i = 0; i < 13; i++)
    if(typeof meses[i] !== "number") meses[i] = '0';

  return meses;
}
