angular.module('dash')

  .controller('homeCtrl', function($scope,$http){

    demo.initChartist();

    angular.element(document).ready(function(){
      $http.get('/manager/dbstats')
        .success(function(data){
          $scope.dbUses = (data.fileSize / 1000000).toFixed(2);
        });
    });


  });
