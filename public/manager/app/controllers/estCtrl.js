angular.module('dash')
  .controller('estCtrl', function($scope, $http, alert, $state){

    $scope.estabelecimentos = [];
    $scope.remove = function(id){

      $http.delete('/manager/estabelecimento/' + id)
        .success(function(){
          getEstabelecimentos();
          alert.send('Deletado com sucesso.', 'success');
        })
        .error(function(){
          alert.send('Erro ao deletar.', 'danger');
        });

    }

    $scope.editest = function(id){

      var data = {};
      data.estid = id;

      $state.go('dash.editest', data);
    }

    $scope.save = function(estabelecimento){

      $http.post('/manager/estabelecimento', estabelecimento)
        .success(function(data){
          getEstabelecimentos();
          alert.send('Adicionado com sucesso.','success');
          $('#addcategory').collapse('toggle');
          delete $scope.estabelecimento;
        })
        .error(function(){
          alert.send('Erro ao adicionar estabelecimento.','danger');
        });

    }

    function getEstabelecimentos(){

      $http.get('/manager/estabelecimentos')
        .success(function(data){
          $scope.estabelecimentos = data;
          console.log(data);
        })
        .error(function(err){
          alert.send('Erro ao obter estabelecimentos', 'danger');
        });
    }

    getEstabelecimentos();

  });
