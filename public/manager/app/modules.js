angular.module("dash", ['ui.router','geral','angular-loading-bar']);

angular.module("dash")
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider','cfpLoadingBarProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider){

    cfpLoadingBarProvider.includeSpinner = false;

    $httpProvider.interceptors.push('interceptor');

    $stateProvider

      .state('dash', {
        url: '/dash',
        templateUrl: 'dashboard.html',
        controller: 'menuCtrl'
      })

      .state('dash.home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl',
        active: 'home',
        nome: 'Dashboard'
      })

      .state('dash.user', {
        url: '/user',
        templateUrl: 'views/user.html',
        controller: 'userCtrl',
        active: 'user',
        nome: 'Usuários'
      })

      .state('dash.edituser', {
        url: '/edituser/:userid',
        templateUrl: 'views/edit-user.html',
        controller: 'edituserCtrl',
        active: 'user',
        nome: 'Editar Usuario'
      })

      .state('dash.editest', {
        url: '/editestabelecimento/:estid',
        templateUrl: 'views/edit-est.html',
        controller: 'editestCtrl',
        active: 'estabelecimento',
        nome: 'Editar Estabelecimento'
      })

      .state('dash.estabelecimentos', {
        url: '/estabelecimentos',
        templateUrl: 'views/estabelecimento.html',
        controller: 'estCtrl',
        active: 'estabelecimento',
        nome: 'Estabelecimentos'
      })

      .state('dash.postagem', {
        url: '/postagens',
        templateUrl: 'views/postagem.html',
        controller: 'postCtrl',
        active: 'postagem',
        nome: 'Postagens'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'loginCtrl',
        nome: 'Login'
      })

      $urlRouterProvider.otherwise('/login');



  }])

  .run(function($location, $rootScope, $window){

    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
        if(toState.name != 'login' && $window.localStorage.token == null) {
          console.log('nao esta autorizado');
          $location.path('/login');
        }

        $('title').html(toState.nome + ' - BinaryMind');
    });

    /**$rootScope.$on('$stateChangeSuccess',function(){

          angular.element(document).ready(function(){
            lbd.initRightMenu();
          })
    }); */

  });
