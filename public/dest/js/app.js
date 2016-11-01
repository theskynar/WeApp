angular.module('site',[]);
var socket = io();

angular.module('site')
  .controller('home', function($scope, $http){
    var self = $scope;

    $scope.message = {};
    $scope.compras = 0;
    $scope.send = function(mail){

      delete $scope.mail;
      $http.post('/comerciante', mail)
        .success(function(){
          $scope.message.type = 'success';
          $scope.message.text = 'Enviado com sucesso.';
        })
        .error(function(){
          $scope.message.type = 'error';
          $scope.message.text = 'Erro ao enviar...';
        })

    }

    $http.get("/site/compras")
      .success(function(data){
        $scope.compras = data;
      });

    socket.on('attdesc', function(desc){
      $scope.$apply(function(){
          self.compras += desc;
      });
    });

  });
