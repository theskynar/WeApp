angular.module('dash')

  .controller('loginCtrl', function($scope, $http, $window, $state, alert){


    $scope.user = {};

    $scope.autentica = function(user){
      if(!!user.email && !!user.password)
        $http.post('auth.js', user)
          .success(function(res){
            alert.send("Logado com sucesso, bem vindo <span style='font-weight: bold'> "+ res.name + '</span>','success',2000,'top','right','ti-unlock');
            $window.localStorage.user = JSON.stringify(res);
            console.log(res);
            $state.go('dash.home',{},{reload: 'dash.home'});
          })
          .error(function(res){
            console.log(res);
            alert.send('Permissão negada, usuario e/ou senha incorretos','danger',2000,'bottom','center','ti-na');
          })
          .finally(function(){
            $scope.user = {};
          });
      else {
        console.log(user);
        alert.send('Preencha os campos','danger',2000,'bottom','center','ti-na');
      }
    }


  });
