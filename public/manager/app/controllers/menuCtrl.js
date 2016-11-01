angular.module('dash')

  .controller('menuCtrl', function($scope, $document, $state, alert){
    var socket = io();
    socket.on('newemail', function(msg){
      alert.send(msg,'info','','','','ti-email');
    });

    $scope.open = lbd.initRightMenu;

    $scope.$route = $state;
    //initMenu();

  });
