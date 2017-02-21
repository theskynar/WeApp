angular.module("dash", ['ui.router','geral','angular-loading-bar','angucomplete']);

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

      .state('dash.notificacao', {
        url: '/notificacoes',
        templateUrl: 'views/notificacoes.html',
        controller: 'notCtrl',
        active: 'notificacoes',
        nome: 'Notificações'
      })

      .state('dash.evento', {
        url: '/eventos',
        templateUrl: 'views/eventos.html',
        controller: 'eventosCtrl',
        active: 'eventos',
        nome: 'Eventos'
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
          if(toState.name != 'login' && (!$window.sessionStorage.token || !$window.sessionStorage.user)) {

            $location.path('/login');
          }

          $('title').html(toState.nome + ' - WeApp');
      });

  });
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
angular.module('dash')
  .factory('graphMaker', function($http, $filter){

    var graph = {};

    graph.getMonth = function(){
      return new Date().getMonth();
    }

    graph.make = function(){
      var self = this;
      $http.get('/manager/estatisticas/getCompras+getUsers')
        .success(function(data){
          self.descontos(data.getCompras);
          self.usuarios(data.getUsers);
        });
    }

    graph.descontos = function(data){
      var descontoDoMes =
        $filter('currency')(data.desconto[this.getMonth()]);
      $('#qDescontos').html(descontoDoMes);
      dataSales.series[1] = data.desconto;
      dataSales.series[0] = data.total;
      Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
    }

    graph.usuarios = function(users){
      $('#qUsers').html(users.total);
      data.series[0] = users.mes;
      Chartist.Line('#chartActivity', data, options, responsiveOptions);
    }

    return graph;

  })


// Descontos.

  var dataSales = {
    labels: ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    series: []
  };

  var optionsSales = {
    lineSmooth: false,
    low: 0,
    showArea: true,
    height: "245px",
    axisX: {
      showGrid: false,
    },
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 3
    }),
    showLine: true,
    showPoint: false,
  };

  var responsiveSales = [
    ['screen and (max-width: 640px)', {
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  // Usuarios.

  var data = {
    labels: ['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    series: []
  };

  var options = {
      seriesBarDistance: 10,
      axisX: {
          showGrid: false
      },
      height: "245px"
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];
angular.module('geral', [])
  .factory('interceptor', function($window, $location, $q){

    var interceptor = {};


    interceptor.request = function(config) {


        config.headers = config.headers || {};
        if ($window.sessionStorage.token) config.headers['x-access-token'] = $window.sessionStorage.token;

        return config;
    }


    interceptor.response = function(response){

      var token = response.headers('x-access-token');
      if (token != null) $window.sessionStorage.token = token;

      return response;

    }

    interceptor.responseError = function(rejection) {

        if (rejection != null && rejection.status === 401) {
            delete $window.sessionStorage.token;
            $location.path("/login");
        }
        return $q.reject(rejection);
    }

    return interceptor;
  })
angular.module('dash')
  .factory('notification', function($http, session){

    return {

      send: function(titulo, subtitulo, texto, descricao){

        return new Promise(function(resolve, reject){

          if(!titulo) return reject('Titulo não foi informado');
          if(!subtitulo) subtitulo = 'Não informado';
          if(!texto) return reject('Texto não foi informado');
          if(!descricao) descricao = 'Não informado';

          var data = {};
          data.titulo = titulo;
          data.subtitulo = subtitulo;
          data.texto = texto;
          data.descricao = descricao;
          data.adminId = session.user().id;

          $http.post('/manager/notificacao', data)
            .success(function(data){

              resolve(data);

            })
            .error(function(err){

              reject(err);

            })


        })

      },

      sendbyJson: function(json){

        return new Promise(function(resolve, reject){

          if(!json.titulo) return reject('Titulo não foi informado');
          if(!json.subtitulo) json.subtitulo = 'Não informado';
          if(!json.texto) return reject('Texto não foi informado');
          if(!json.descricao) json.descricao = 'Não informado';


          json.adminId = session.user().id;

          $http.post('/manager/notificacao', json)
            .success(function(data){

              resolve(data);

            })
            .error(function(err){

              reject(err);

            })


        })

      }


    }


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
angular.module('dash')

  .controller('homeCtrl', function($scope,$http, graphMaker){

    graphMaker.make();
    var socket = io();

    socket.on('attgraph', function(){
      graphMaker.users();
    });


  });
angular.module('dash')

  .controller('loginCtrl', function($scope, alert, session){


    $scope.user = {};

    $scope.autentica = function(user){
      if(!!user.email && !!user.password){
        session.auth(user)
          .then(function(res){
            alert.send("Logado com sucesso, bem vindo <span style='font-weight: bold'> "+ res.name + '</span>','success',2000,'top','right','ti-unlock');
          })
          .catch(function(res){
            alert.send('Usuário ou senha incorretos.','warning');
          });
        delete $scope.user;
      }
      else
        alert.send('Preencha os campos','danger',2000,'bottom','center','ti-na');
    }


  });
angular.module('dash')

  .controller('menuCtrl', function($scope, $document, $state, alert){
    var socket = io();
    socket.on('newemail', function(msg){
      alert.send(msg,'info','','','','ti-email');
    });

    $scope.open = lbd.initRightMenu;

    $scope.$route = $state;
    //initMenu();

  });
