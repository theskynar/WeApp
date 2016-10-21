angular.module('dash')

  .controller('menuCtrl', function($timeout,$scope, $document, $location, $state){

    $scope.open = lbd.initRightMenu;

    $scope.$route = $state;
    //initMenu();

  });
