angular.module('dash')
  .factory('session', function($location, $window, $http, $q, $state){

    var session = {};
    session.auth = function(user){
      return $q(function( resolve, reject ){
        $http.post('auth.js', user)
          .success(function(res){
            $window.sessionStorage.user = JSON.stringify(res);
            $state.go('dash.home',{},{reload: 'dash.home'});
            resolve(res);
          })
          .error(function(res){
            reject(res);
          });
      });
    }

    session.user = function(){

      return JSON.parse($window.sessionStorage.user);

    }

    session.destroy = function(){

      delete $window.sessionStorage.token;
      $state.go('login',{},{reload: 'login'});

    }

    return session;

  });
