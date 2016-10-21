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
angular.module('dash')
  .factory('alert', function(){

    var alert = {};

    alert.send = function(msg, type, delay, pos, align, icon){

      if(!icon && !!type){
        if(type == 'danger') icon = 'ti-na';
        else if(type == 'success') icon = 'ti-check';
      }
      $.notify({
          icon: icon,
          message: msg
        },{
            type: type ? type : 'warning',
            timer: (!!delay) ? delay : 2000,
            placement: {
                from: (!!pos) ? pos : 'bottom',
                align: (!!align) ? align : 'center'
            }
        });

    }

    return alert;
  });
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
angular.module('dash')
  .factory('validate', function(){


    var helper = {};
    helper._email = function(email){

      var regEx = /^[\w || \. || \-]{3,}@\w{3,}\.[a-z]{2,3}(\.[a-z]{2,3})?$/;
      return regEx.test(email);

    }
    helper._data = function(data){

      var data = new Date(data);
      if(data != 'Invalid Date') return true;
      else return false;

    }
    helper._level = function(level){

      if(parseInt(level) != 'NaN') return true;
      else return false;

    }
    helper._preenchido = function(informacao){

      if(!!informacao) return true;
      else return false;

    }

    helper.valida = function(user){


      var nome = this._preenchido(user.nome);
      var usuario = this._preenchido(user.usuario);
      var senha = this._preenchido(user.senha);
      var imagem = this._preenchido(user.image);
      var sobre = this._preenchido(user.descricao);
      var email = this._email(user.email);
      var level = this._level(user.level);
      var data = this._data(user.nasc);

      if(nome && usuario && senha && imagem && sobre && email && level && data)
        return true;
      else
        return false;


    }


    return helper;
  })
angular.module('dash')
  .directive("dateFormater", function ($filter) {
    return {
      require: "ngModel",
      link: function (scope, element, attrs, ctrl) {
        var _formatDate = function (date) {
          if (!date) return date;
          date = date.replace(/[^0-9]+/g, "");
          if(date.length > 2) {
            date = date.substring(0,2) + "/" + date.substring(2);
          }
          if(date.length > 5) {
            date = date.substring(0,5) + "/" + date.substring(5,9);
          }
          return date;
        };

        element.bind("keyup", function () {
          ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
          ctrl.$render();
        });

        ctrl.$parsers.push(function (value) {
          if (value.length === 10) {
            var dateArray = value.split("/");
            return new Date(dateArray[2], dateArray[1]-1, dateArray[0]).getTime();
          }
        });

        ctrl.$formatters.push(function (value) {
          return $filter("date")(value, "dd/MM/yyyy");
        });
      }
    }
  });
angular.module('dash')
  .directive("numberFormater", function ($filter) {
    return {
      require: "ngModel",
      link: function (scope, element, attrs, ctrl) {
          var _formatNumber = function(number){
            if(!number) return number;
            var number = number.replace(/[^0-9]+/g, "");

            return parseInt(number.substr(0,1));
          }

          element.bind("keyup", function () {
            ctrl.$setViewValue(_formatNumber(ctrl.$viewValue));
            ctrl.$render();
          });
        },

      }
  });
angular.module("dash")
  .controller('editestCtrl', function($scope, $http, alert, $stateParams){

    var id = $stateParams.estid;

    $scope.estabelecimento = {};

    $scope.save = function(estabelecimento){

      $http.put('/manager/estabelecimento/' + id, estabelecimento)
        .success(function(res){
          alert.send('Salvo com sucesso','success');
        })
        .error(function(err){
          alert.send('Houve um erro inesperado...', 'danger');
        });

    }

    $http.get('/manager/estabelecimento/' + id)
      .success(function(res){
        $scope.estabelecimento = res;
        console.log($scope.estabelecimento);
      })
      .error(function(res){
        alert.send(res, 'danger');
      });

  });
angular.module('dash')
  .controller('edituserCtrl', function($scope, $http, $stateParams, alert){

    var id = $stateParams.userid;
    $scope.user = {};

    $scope.save = function(){

      $http.put('/manager/user/' + id, $scope.user)
        .success(function(res){
          $scope.user = res;
          alert.send('Salvo com sucesso','success');
        })
        .error(function(err){
          alert.send('Houve um erro inesperado...', 'danger');
        });

    }

    $http.get('/manager/user/' + id)
      .success(function(res){
        $scope.user = res;
        console.log(res);
      })
      .error(function(res){
        alert.send(res, 'danger');
      });

  });
angular.module('dash')
  .controller('estCtrl', function($scope, $http, alert, $state){

    $scope.estabelecimentos = [];
    $scope.remove = function(id){

      $http.delete('/manager/estabelecimento/' + id)
        .success(function(){
          getEstabelecimentos();
          alert.send('Deletado com sucesso.', 'success');
        })
        .error(function(){
          alert.send('Erro ao deletar.', 'danger');
        });

    }

    $scope.editest = function(id){

      var data = {};
      data.estid = id;

      $state.go('dash.editest', data);
    }

    $scope.save = function(estabelecimento){

      $http.post('/manager/estabelecimento', estabelecimento)
        .success(function(data){
          getEstabelecimentos();
          alert.send('Adicionado com sucesso.','success');
          $('#addcategory').collapse('toggle');
          delete $scope.estabelecimento;
        })
        .error(function(){
          alert.send('Erro ao adicionar estabelecimento.','danger');
        });

    }

    function getEstabelecimentos(){

      $http.get('/manager/estabelecimentos')
        .success(function(data){
          $scope.estabelecimentos = data;
          console.log(data);
        })
        .error(function(err){
          alert.send('Erro ao obter estabelecimentos', 'danger');
        });
    }

    getEstabelecimentos();

  });
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
angular.module('dash')

  .controller('loginCtrl', function($scope, $http, $window, $state, alert){


    $scope.user = {};

    $scope.autentica = function(user){
      if(!!user.email && !!user.password)
        $http.post('auth.js', user)
          .success(function(res){
            alert.send("Logado com sucesso, bem vindo <span style='font-weight: bold'> "+ res.name + '</span>','success',2000,'top','right','ti-unlock');
            $window.localStorage.user = JSON.stringify(res);
            console.log(res);
            $state.go('dash.home',{},{reload: 'dash.home'});
          })
          .error(function(res){
            console.log(res);
            alert.send('Permissão negada, usuario e/ou senha incorretos','danger',2000,'bottom','center','ti-na');
          })
          .finally(function(){
            $scope.user = {};
          });
      else {
        console.log(user);
        alert.send('Preencha os campos','danger',2000,'bottom','center','ti-na');
      }
    }


  });
angular.module('dash')

  .controller('menuCtrl', function($timeout,$scope, $document, $location, $state){

    $scope.open = lbd.initRightMenu;

    $scope.$route = $state;
    //initMenu();

  });
angular.module('dash')
  .controller('postCtrl', function($scope, $http, alert){

    $scope.postagens = [];

    $http.get('/manager/postagens')
      .success(function(data){
        $scope.postagens = data;
      })
      .error(function(err){
        alert.send('Erro ao obter postagens do servidor.','danger');
      })

  });
angular.module('dash')
  .controller('userCtrl', function($scope, $http, $state, alert, validate){

    $scope.users = [];
    $scope.changepass = function(){
      var input = $('#pass input');
      if(input.attr('type') == 'password') input.attr('type','text');
      else input.attr('type','password');
    }


    $scope.saveuser = function(user){
        $http.post('/manager/user', user)
          .success(function(res){
            alert.send('Adicionado com sucesso', 'success');
            delete $scope.user;
            getUsersList();
            $('#adduser').modal('toggle')
          })
          .error(function(res){
            alert.send(err,'danger');
          });
    }
    $scope.edituser = function(id){

      var data = {};
      data.userid = id;

      $state.go('dash.edituser', data);
    }
    $scope.removeuser = function(id){

      $http.delete('/manager/user/' + id)
        .success(function(){
          alert.send('Deletado com sucesso.', 'success');
          getUsersList();
        })
        .error(function(){
          alert.send('Erro ao deletar usuário.','danger');
        })
    }


    function getUsersList(){
      $http.get('/manager/users')
        .success(function(res){
          $scope.users = res;
        })
        .error(function(err){
          alert.send('Não foi possivel obter a lista','danger');
        });
    }

    getUsersList();
  })
