var app = angular.module('app', []);
(function() {
'use strict';

    angular.module('app').controller('financesHome', function($http, $scope) {
        $scope.moneyCart = 500.75;
        $scope.receiveMoney = 200.05;
        $scope.payMoney = 489.09;
    });
})();(function() {
'use strict';

    angular.module('app').controller('loguser', function($http, $scope, $location) {
        $scope.userName = "Matheus Bordin";
    });
})();app.controller("loginCtrl", function($scope, $http){
  $scope.getSession = function session(){
    $http.get('/dashboard/session').success(function(data){
      console.log(data);
    });
  };
  $scope.login = function(user, invalid){
    if(!invalid){
      $http.post('/login', user).success(function(data){
        $location.path('/dashboard');
      });
    }else {
      console.log("invalid");
    }
  }
});
