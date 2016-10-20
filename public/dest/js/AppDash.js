var app = angular.module('app', [])
  .config(function($httpProvider){

    $httpProvider.interceptors.push('interceptor');
  });
app
  .factory('interceptor', function($window, $location, $q){

    var interceptor = {};

    interceptor.response = function(response){
      var token = response.headers('x-access-token');
      if(!!token){
        $window.localStorage.token = token;
        console.log('Token recebido, sessão pronta.')
      }

      return response;
    }

    interceptor.request = function(config){
      config.headers = config.headers || {};
      if(!!$window.localStorage.token)
        config.headers['x-access-token'] = $window.localStorage.token;
      return config;
    }

    interceptor.responseError = function(rejection) {
        if(rejection != null && rejection.status == 401) {
          delete $window.localStorage.token;
          console.log('token deletado');
        }
        return $q.reject(rejection);
    };


    return interceptor;
  });
(function() {
'use strict';

    angular.module('app').controller('financesHome', function($http, $scope) {
        $scope.moneyCart = 500.75;
        $scope.receiveMoney = 200.05;
        $scope.payMoney = 489.09;
    });
})();app.controller("loginCtrl", function($scope, $http){
  $scope.getSession = function session(){
    $http.get('/dashboard/session').success(function(data){
      console.log(data);
    });
  };
  $scope.login = function(user, invalid){
    if(!invalid){
      $http.post('/login',user).success(function(data){
        console.log(data);
      });
    }else {
      console.log("invalid");
    }
  }
});
(function() {
'use strict';

    angular.module('app').controller('loguser', function($http, $scope) {
        $scope.userName = "Matheus Bordin";
    });
})();

