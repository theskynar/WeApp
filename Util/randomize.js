let retArray = [];
/** HELPERS of HELPERS*/
concat = (array) => {
  checkedArray = array.filter(elem => elem.isChecked == 1);
  array = array.concat(checkedArray);
  return array;
}

rand = (arrCat) => {
  let rand = Math.floor(Math.random() * arrCat.length);
  return rand;
}

sortAux = (array, qtd) => {
  if(qtd < 0) throw new Error("ERRO INESPERADO");
  if(qtd == 0) return retArray;
    let arrCat = concat(array);
    diff = arrCat.filter(elem => retArray.indexOf(elem) < 0 );
    retArray.push(diff[rand(diff)]);
    return sortAux(array, qtd - 1);
}
/* JAJAJA */

module.exports = {
    sorteio2: function(array, qtd) {
      retArray = [];
      return sortAux(array, qtd);
    },
    sorteio: function(array) {
        checkedArray = array.filter(elem => elem.isChecked == 1);
        array = array.concat(checkedArray);
        var rand = Math.floor(Math.random() * array.length);
        return array[rand];
    },
    removeDuplicates: function(arr) {
      arr = arr.filter((esteArray, i) => {
          return arr.indexOf(esteArray) == i;
      })
      return arr;
    },
    filterDiff: function(first, second) {
      diff = first.filter(elem => second.indexOf(elem) < 0);
      return diff;
    }
}
