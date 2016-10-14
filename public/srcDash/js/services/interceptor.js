app
  .factory('interceptor', function($window){

    var interceptor = {};




    interceptor.response = function(response){

      var token = response.headers('x-access-token');
      if(!!token){
        $window.localStorage.token(token);
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








    return interceptor;
  });
