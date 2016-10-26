angular.module('dash')
  .controller('eventosCtrl', function($scope, $http, alert, notification){

    $scope.eventos = [];
    $scope.estabelecimentos = [];

    $scope.salvar = function(evento){

      evento.estabelecimentoId = evento.estabelecimento.originalObject.id;
      delete evento.estabelecimento;
      $http.post('/manager/evento', evento)
        .success(function(data){
          alert.send('Evento adicionado!', 'success');
          getEventos();


          notification.send('WeApp - Novo evento!', 'Novo Evento', evento.titulo + ' - ' + evento.desc, 'Notificação de evento: ' + evento.titulo);

        })
        .error(function(err){
          console.log(err);
          alert.send('Erro ao adicionar evento', 'danger');
        })


    }

    $scope.edit = function(item){

      var toggle = $("[name='switch']");
      toggle.bootstrapSwitch();
      if(item.status == 1){
        toggle.attr('checked','');
      }else {
        toggle.removeAttr('checked');
      }

      $scope.editactive = angular.copy(item);
      $('#edit').modal('toggle')

    }

    $scope.update = function(item){

      var toggle = $("[name='switch']");
      if(toggle.prop('checked'))
        item.status = 1;
      else
        item.status = 0;

      $http.put('/manager/evento/' + item.id, item)
        .success(function(data){
          getEventos();
          alert.send('Evento editado com sucesso', 'success');
          $('#edit').modal('toggle')
        })
        .error(function(err){
          console.log(err);
          alert.send('Erro ao editar evento', 'danger');
        });

    }

    function getEventos(){
      $http.get('/manager/eventos')
        .success(function(data){
          $scope.eventos = data;
        })
        .error(function(err){
          console.log(err);
          alert.send('Erro ao importar eventos', 'danger');
        });
      }

    $http.get('/manager/estabelecimentos')
      .success(function(data){
        $scope.estabelecimentos = data;
      })
      .error(function(err){
        console.log(err);
        alert.send('Erro ao importar estabelecimentos', 'danger');
      });

      getEventos();

  });
