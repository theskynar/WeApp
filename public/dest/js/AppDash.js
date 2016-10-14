var app = angular.module('app', [])
  .config(function($routeProvider, $locationProvider, $httpProvider){

    $httpProvider.interceptors.push('interceptor');

    $routeProvider.when('/dashboard', {
      templateUrl: 'partials/principal.html',
      controller: 'FotosController'
    });

    $routeProvider.when('/fotos/new', {
      templateUrl: 'partials/foto.html',
      controller: 'FotoController'
    });

    $routeProvider.when('/fotos/edit/:fotoId', {
      templateUrl: 'partials/foto.html',
      controller: 'FotoController'
    });

    $routeProvider.otherwise({redirectTo: '/fotos'});

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
      console.log("aqui");
        if(rejection != null && rejection.status == 401) {
          console.log("aqui2");
          delete $window.localStorage.token;
          window.location = '/login';
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
        if(data == 'logado') console.log('logou');
        else console.log(data);
        location.reload();
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
