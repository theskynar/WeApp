angular.module("dash")
  .controller('editestCtrl', function($scope, $http, alert, $stateParams){

    var id = $stateParams.estid;

    $scope.estabelecimento = {};

    $scope.save = function(estabelecimento){

      $http.put('/manager/estabelecimento/' + id, estabelecimento)
        .success(function(res){
          alert.send('Salvo com sucesso','success');
        })
        .error(function(err){
          alert.send('Houve um erro inesperado...', 'danger');
        });

    }

    $http.get('/manager/estabelecimento/' + id)
      .success(function(res){
        $scope.estabelecimento = res;
        var ndt = new Date($scope.estabelecimento.vencPlano);
        $scope.estabelecimento.vencPlano = ndt;
      })
      .error(function(res){
        alert.send(res, 'danger');
      });

  });
