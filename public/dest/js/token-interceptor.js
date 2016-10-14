angular.module('app')
  .factory('tokenInterceptor', function ($window, $q, &location) {
      var interceptor = {};

      interceptor.response = function(res) {
        var token = response.header('x-access-token');
        if(token) {
          $window.localStorage.token = token;
        }

        return response;
      };

      interceptor.request = function(config) {
        config.headers = config.headers || {};
        if($window.localStorage.token) {
          config.headers['x-access-token'] = $window.localStorage.token;
        }
        return config;
      };

      interceptor.responseError = function(rejection) {
          if(rejection != null && rejection.status == 401) {
            delete $window.localStorage.token;
            $location.path('/login');
          }
          return $q.reject(rejection);
      };

      return interceptor;
  });
