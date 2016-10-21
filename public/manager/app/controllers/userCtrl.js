angular.module('dash')
  .controller('userCtrl', function($scope, $http, $state, alert, validate){

    $scope.users = [];
    $scope.changepass = function(){
      var input = $('#pass input');
      if(input.attr('type') == 'password') input.attr('type','text');
      else input.attr('type','password');
    }


    $scope.saveuser = function(user){
        $http.post('/manager/user', user)
          .success(function(res){
            alert.send('Adicionado com sucesso', 'success');
            delete $scope.user;
            getUsersList();
            $('#adduser').modal('toggle')
          })
          .error(function(res){
            alert.send(err,'danger');
          });
    }
    $scope.edituser = function(id){

      var data = {};
      data.userid = id;

      $state.go('dash.edituser', data);
    }
    $scope.removeuser = function(id){

      $http.delete('/manager/user/' + id)
        .success(function(){
          alert.send('Deletado com sucesso.', 'success');
          getUsersList();
        })
        .error(function(){
          alert.send('Erro ao deletar usuário.','danger');
        })
    }


    function getUsersList(){
      $http.get('/manager/users')
        .success(function(res){
          $scope.users = res;
        })
        .error(function(err){
          alert.send('Não foi possivel obter a lista','danger');
        });
    }

    getUsersList();
  })
