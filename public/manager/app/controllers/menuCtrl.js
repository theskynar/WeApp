angular.module('dash')

  .controller('menuCtrl', function($scope, $document, $state){

    $scope.open = lbd.initRightMenu;

    $scope.$route = $state;
    //initMenu();

  });
