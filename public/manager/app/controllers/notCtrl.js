angular.module('dash')
  .controller('notCtrl', function($scope, $http, $window, alert, notification) {

    $scope.notificacoes = [];

    $scope.enviar = function(notifica){
      notification.sendbyJson(notifica);
      getNotifications();
      delete $scope.notify;
    };

    function getNotifications(){
      $http.get('/manager/notificacoes')
        .success(function(data){
          $scope.notificacoes = data;
        })
        .error(function(err){
          console.log(err);
          alert.send('Erro ao importar notificacoes', 'danger');
        });
    }

    getNotifications();


  });
