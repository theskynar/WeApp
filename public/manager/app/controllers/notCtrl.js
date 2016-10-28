angular.module('dash')
  .controller('notCtrl', function($scope, $http, alert, notification) {

    $scope.notificacoes = [];

    $scope.enviar = function(notifica){
      notification.sendbyJson(notifica)
        .then(function(data){
          getNotifications();
          alert.send('A notificação foi enviada com sucesso!', 'success');
        })
        .catch(function(err){
          alert.send('Houve um erro ao enviar a notificação...', 'danger');
        });
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
