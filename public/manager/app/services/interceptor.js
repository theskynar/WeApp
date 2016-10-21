angular.module('geral', [])
  .factory('interceptor', function($window, $location, $q){

    var interceptor = {};


    interceptor.request = function(config) {


        config.headers = config.headers || {};
        if ($window.localStorage.token) config.headers['x-access-token'] = $window.localStorage.token;

        return config;
    }


    interceptor.response = function(response){

      var token = response.headers('x-access-token');
      if (token != null) $window.localStorage.token = token;

      return response;

    }

    interceptor.responseError = function(rejection) {

        if (rejection != null && rejection.status === 401) {
            delete $window.localStorage.token;
            $location.path("/login");
        }
        return $q.reject(rejection);
    }

    return interceptor;
  })
