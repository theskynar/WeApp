module.exports = {
    sorteio2: function(array) {
      checkedArray = array.filter(elem => elem.isChecked == 1);
      array = array.concat(checkedArray);
      let rand = Math.floor(Math.random() * array.length);
      return array[rand];
    },
    sorteio: function(array, length) {
      	let cont = 0;
      	while(cont <= 2) {
      	let random = Math.floor(Math.random() * length + 1);
      		if(array[random].isChecked === 1)
      			return array[random];
      		else if (array[random].isChecked === 0 && cont === 2)
      			return array[random];
      		cont++;
      	}
    }
}
