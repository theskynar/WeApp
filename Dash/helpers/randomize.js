module.exports = {
    sorteio2: function(array) {
      checkedArray = array.filter(elem => elem.isChecked == 1);
      array = array.concat(checkedArray);
      var rand = Math.floor(Math.random() * array.length);
      console.log(array.length);
      return array[rand];
    },
    sorteio: function(array, length) {
      	var cont = 0;
      	while(cont <= 2) {
      	var random = Math.floor(Math.random() * length + 1);
        console.log(random);
        console.log(array[random]);
      		if(array[random].isChecked === 1)
      			return array[random];
      		else if (array[random].isChecked === 0 && cont === 2)
      			return array[random];
      		cont++;
      	}
    }
}