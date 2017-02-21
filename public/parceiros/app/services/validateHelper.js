angular.module('dash')
  .factory('validate', function(){


    var helper = {};
    helper._email = function(email){

      var regEx = /^[\w || \. || \-]{3,}@\w{3,}\.[a-z]{2,3}(\.[a-z]{2,3})?$/;
      return regEx.test(email);

    }
    helper._data = function(data){

      var data = new Date(data);
      if(data != 'Invalid Date') return true;
      else return false;

    }
    helper._level = function(level){

      if(parseInt(level) != 'NaN') return true;
      else return false;

    }
    helper._preenchido = function(informacao){

      if(!!informacao) return true;
      else return false;

    }

    helper.valida = function(user){


      var nome = this._preenchido(user.nome);
      var usuario = this._preenchido(user.usuario);
      var senha = this._preenchido(user.senha);
      var imagem = this._preenchido(user.image);
      var sobre = this._preenchido(user.descricao);
      var email = this._email(user.email);
      var level = this._level(user.level);
      var data = this._data(user.nasc);

      if(nome && usuario && senha && imagem && sobre && email && level && data)
        return true;
      else
        return false;


    }


    return helper;
  })
