angular.module('dash')
  .controller('edituserCtrl', function($scope, $http, $stateParams, alert){

    var id = $stateParams.userid;
    $scope.user = {};

    $scope.save = function(){

      $http.put('/manager/user/' + id, $scope.user)
        .success(function(res){
          $scope.user = res;
          alert.send('Salvo com sucesso','success');
        })
        .error(function(err){
          alert.send('Houve um erro inesperado...', 'danger');
        });

    }

    $http.get('/manager/user/' + id)
      .success(function(res){
        $scope.user = res;
        console.log(res);
      })
      .error(function(res){
        alert.send(res, 'danger');
      });

  });
