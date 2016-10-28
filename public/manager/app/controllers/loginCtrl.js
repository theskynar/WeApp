angular.module('dash')

  .controller('loginCtrl', function($scope, alert, session){


    $scope.user = {};

    $scope.autentica = function(user){
      if(!!user.email && !!user.password){
        session.auth(user)
          .then(function(res){
            alert.send("Logado com sucesso, bem vindo <span style='font-weight: bold'> "+ res.name + '</span>','success',2000,'top','right','ti-unlock');
          })
          .catch(function(res){
            alert.send('Usuário ou senha incorretos.','warning');
          });
        delete $scope.user;
      }
      else
        alert.send('Preencha os campos','danger',2000,'bottom','center','ti-na');
    }


  });
