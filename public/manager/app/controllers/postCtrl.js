angular.module('dash')
  .controller('postCtrl', function($scope, $http, alert){

    $scope.postagens = [];

    $http.get('/manager/postagens')
      .success(function(data){
        $scope.postagens = data;
      })
      .error(function(err){
        alert.send('Erro ao obter postagens do servidor.','danger');
      })

  });
